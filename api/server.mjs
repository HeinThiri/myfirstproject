import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { IncomingMessage, ServerResponse } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lazy load the server handler
let reqHandler = null;

async function getHandler() {
  if (!reqHandler) {
    const serverPath = resolve(__dirname, '../dist/myfirstproject/server/server.mjs');
    const serverModule = await import(serverPath);
    reqHandler = serverModule.reqHandler;
  }
  return reqHandler;
}

export default async function handler(req, res) {
  try {
    const handler = await getHandler();
    
    // Create a Node.js-compatible request object
    const nodeReq = Object.create(IncomingMessage.prototype);
    Object.assign(nodeReq, {
      url: req.url,
      method: req.method || 'GET',
      headers: req.headers || {},
      query: req.query || {},
      body: req.body,
      get: function(header) {
        return this.headers[header?.toLowerCase()];
      },
      originalUrl: req.url,
    });

    // Create a Node.js-compatible response object
    let statusCode = 200;
    const responseHeaders = {};
    let responseBody = '';

    const nodeRes = Object.create(ServerResponse.prototype);
    Object.assign(nodeRes, {
      statusCode: 200,
      write: function(chunk) {
        responseBody += chunk?.toString() || '';
        return true;
      },
      end: function(chunk, encoding, callback) {
        if (chunk) {
          responseBody += chunk.toString();
        }
        
        // Send response to Vercel
        res.status(statusCode);
        Object.keys(responseHeaders).forEach(key => {
          res.setHeader(key, responseHeaders[key]);
        });
        
        if (responseBody) {
          res.send(responseBody);
        } else {
          res.end();
        }
        
        if (typeof callback === 'function') {
          callback();
        }
      },
      writeHead: function(code, statusMessage, headers) {
        statusCode = code;
        if (typeof statusMessage === 'object') {
          Object.assign(responseHeaders, statusMessage);
        } else if (headers) {
          Object.assign(responseHeaders, headers);
        }
        return this;
      },
      setHeader: function(name, value) {
        responseHeaders[name.toLowerCase()] = value;
        return this;
      },
      getHeader: function(name) {
        return responseHeaders[name.toLowerCase()];
      },
      removeHeader: function(name) {
        delete responseHeaders[name.toLowerCase()];
      },
    });

    // Call the Angular SSR handler
    await handler(nodeReq, nodeRes);
  } catch (error) {
    console.error('Error handling request:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
}

