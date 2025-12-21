import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lazy load the server handler
let reqHandler = null;

async function getHandler() {
  if (!reqHandler) {
    try {
      const serverPath = resolve(__dirname, '../dist/myfirstproject/server/server.mjs');
      const serverModule = await import(serverPath);
      
      // Check if reqHandler exists in the module
      if (serverModule.reqHandler) {
        reqHandler = serverModule.reqHandler;
      } else {
        throw new Error('reqHandler not found in server module. Available exports: ' + Object.keys(serverModule).join(', '));
      }
    } catch (error) {
      console.error('Error loading server module:', error);
      throw error;
    }
  }
  return reqHandler;
}

export default async function handler(req, res) {
  try {
    const handler = await getHandler();
    
    // Convert Vercel request to Node.js request-like object
    const nodeReq = {
      url: req.url || '/',
      method: req.method || 'GET',
      headers: req.headers || {},
      query: req.query || {},
      body: req.body,
      get: function(header) {
        return this.headers[header?.toLowerCase()];
      },
      originalUrl: req.url || '/',
      protocol: 'https',
      hostname: req.headers?.host || '',
      path: new URL(req.url || '/', 'https://example.com').pathname,
      ip: req.headers?.['x-forwarded-for'] || req.headers?.['x-real-ip'] || '',
    };

    // Convert Vercel response to Node.js response-like object
    let statusCode = 200;
    const responseHeaders = {};
    let responseBody = '';
    let headersSent = false;

    const nodeRes = {
      statusCode: 200,
      write: function(chunk) {
        if (!headersSent) {
          responseBody += chunk?.toString() || '';
        }
        return true;
      },
      end: function(chunk, encoding, callback) {
        if (chunk) {
          responseBody += chunk.toString();
        }
        
        if (!headersSent) {
          headersSent = true;
          
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
        }
      },
      writeHead: function(code, statusMessage, headers) {
        if (!headersSent) {
          statusCode = code;
          if (typeof statusMessage === 'object') {
            Object.assign(responseHeaders, statusMessage);
          } else if (headers) {
            Object.assign(responseHeaders, headers);
          }
        }
        return this;
      },
      setHeader: function(name, value) {
        if (!headersSent) {
          responseHeaders[name.toLowerCase()] = value;
        }
        return this;
      },
      getHeader: function(name) {
        return responseHeaders[name.toLowerCase()];
      },
      removeHeader: function(name) {
        delete responseHeaders[name.toLowerCase()];
      },
      headersSent: false,
    };

    // Call the Angular SSR handler
    await handler(nodeReq, nodeRes);
    
    // Ensure response is sent if handler didn't call end()
    if (!headersSent) {
      res.status(statusCode);
      Object.keys(responseHeaders).forEach(key => {
        res.setHeader(key, responseHeaders[key]);
      });
      if (responseBody) {
        res.send(responseBody);
      } else {
        res.end();
      }
    }
  } catch (error) {
    console.error('Error handling request:', error);
    console.error('Error stack:', error.stack);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
}
