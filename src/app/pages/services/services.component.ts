import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  // Tic Tac Toe Game
  ticTacToeBoard: (string | null)[] = Array(9).fill(null);
  ticTacToeCurrentPlayer: string = 'X';
  ticTacToeWinner: string | null = null;
  ticTacToeGameOver: boolean = false;
  ticTacToeXScore: number = 0;
  ticTacToeOScore: number = 0;
  ticTacToeDraws: number = 0;
  ticTacToeIsAI: boolean = false;
  showTicTacToe: boolean = false;

  // Rock Paper Scissors Game
  rpsPlayerChoice: string = '';
  rpsComputerChoice: string = '';
  rpsResult: string = '';
  rpsPlayerScore: number = 0;
  rpsComputerScore: number = 0;
  showRockPaperScissors: boolean = false;

  // Memory Game
  memoryCards: { id: number; value: string; flipped: boolean; matched: boolean }[] = [];
  memoryFlippedCards: number[] = [];
  memoryMoves: number = 0;
  memoryMatches: number = 0;
  showMemoryGame: boolean = false;

  // Calculator
  calculatorDisplay: string = '0';
  calculatorPreviousValue: string = '';
  calculatorOperator: string = '';
  showCalculator: boolean = false;

  // Todo List
  todos: { id: number; text: string; completed: boolean }[] = [];
  newTodoText: string = '';
  showTodoList: boolean = false;

  // Snake Game
  showSnakeGame: boolean = false;

  // Tic Tac Toe Methods
  openTicTacToe() {
    this.showTicTacToe = true;
    this.resetTicTacToe();
  }

  resetTicTacToe() {
    this.ticTacToeBoard = Array(9).fill(null);
    this.ticTacToeCurrentPlayer = 'X';
    this.ticTacToeWinner = null;
    this.ticTacToeGameOver = false;
  }

  toggleAIMode() {
    this.ticTacToeIsAI = !this.ticTacToeIsAI;
    this.resetTicTacToe();
  }

  makeMove(index: number) {
    if (this.ticTacToeBoard[index] || this.ticTacToeGameOver) return;
    if (this.ticTacToeCurrentPlayer === 'O' && this.ticTacToeIsAI) return;

    this.ticTacToeBoard[index] = this.ticTacToeCurrentPlayer;
    this.checkTicTacToeWinner();
    
    if (!this.ticTacToeGameOver) {
      this.ticTacToeCurrentPlayer = this.ticTacToeCurrentPlayer === 'X' ? 'O' : 'X';
      
      if (this.ticTacToeIsAI && this.ticTacToeCurrentPlayer === 'O' && !this.ticTacToeGameOver) {
        setTimeout(() => this.makeAIMove(), 500);
      }
    } else {
      this.updateScores();
    }
  }

  makeAIMove() {
    const availableMoves = this.ticTacToeBoard
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];
    
    if (availableMoves.length > 0) {
      const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      this.ticTacToeBoard[randomMove] = 'O';
      this.checkTicTacToeWinner();
      
      if (!this.ticTacToeGameOver) {
        this.ticTacToeCurrentPlayer = 'X';
      } else {
        this.updateScores();
      }
    }
  }

  updateScores() {
    if (this.ticTacToeWinner === 'X') {
      this.ticTacToeXScore++;
    } else if (this.ticTacToeWinner === 'O') {
      this.ticTacToeOScore++;
    } else {
      this.ticTacToeDraws++;
    }
  }

  checkTicTacToeWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (this.ticTacToeBoard[a] && 
          this.ticTacToeBoard[a] === this.ticTacToeBoard[b] && 
          this.ticTacToeBoard[a] === this.ticTacToeBoard[c]) {
        this.ticTacToeWinner = this.ticTacToeBoard[a];
        this.ticTacToeGameOver = true;
        return;
      }
    }

    if (!this.ticTacToeBoard.includes(null)) {
      this.ticTacToeGameOver = true;
    }
  }

  // Rock Paper Scissors Methods
  openRockPaperScissors() {
    this.showRockPaperScissors = true;
    this.resetRockPaperScissors();
  }

  resetRockPaperScissors() {
    this.rpsPlayerChoice = '';
    this.rpsComputerChoice = '';
    this.rpsResult = '';
    this.rpsPlayerScore = 0;
    this.rpsComputerScore = 0;
  }

  playRockPaperScissors(choice: string) {
    this.rpsPlayerChoice = choice;
    const choices = ['rock', 'paper', 'scissors'];
    this.rpsComputerChoice = choices[Math.floor(Math.random() * 3)];

    if (this.rpsPlayerChoice === this.rpsComputerChoice) {
      this.rpsResult = 'Draw!';
    } else if (
      (this.rpsPlayerChoice === 'rock' && this.rpsComputerChoice === 'scissors') ||
      (this.rpsPlayerChoice === 'paper' && this.rpsComputerChoice === 'rock') ||
      (this.rpsPlayerChoice === 'scissors' && this.rpsComputerChoice === 'paper')
    ) {
      this.rpsResult = 'You Win!';
      this.rpsPlayerScore++;
    } else {
      this.rpsResult = 'Computer Wins!';
      this.rpsComputerScore++;
    }
  }

  // Memory Game Methods
  openMemoryGame() {
    this.showMemoryGame = true;
    this.initMemoryGame();
  }

  initMemoryGame() {
    const values = ['🎮', '🎯', '🎲', '🎨', '🎪', '🎭', '🎮', '🎯', '🎲', '🎨', '🎪', '🎭'];
    const shuffled = values.sort(() => Math.random() - 0.5);
    this.memoryCards = shuffled.map((value, index) => ({
      id: index,
      value: value,
      flipped: false,
      matched: false
    }));
    this.memoryFlippedCards = [];
    this.memoryMoves = 0;
    this.memoryMatches = 0;
  }

  flipCard(index: number) {
    if (this.memoryCards[index].flipped || this.memoryCards[index].matched) return;
    if (this.memoryFlippedCards.length === 2) return;

    this.memoryCards[index].flipped = true;
    this.memoryFlippedCards.push(index);

    if (this.memoryFlippedCards.length === 2) {
      this.memoryMoves++;
      const [first, second] = this.memoryFlippedCards;
      if (this.memoryCards[first].value === this.memoryCards[second].value) {
        this.memoryCards[first].matched = true;
        this.memoryCards[second].matched = true;
        this.memoryMatches++;
        this.memoryFlippedCards = [];
      } else {
        setTimeout(() => {
          this.memoryCards[first].flipped = false;
          this.memoryCards[second].flipped = false;
          this.memoryFlippedCards = [];
        }, 1000);
      }
    }
  }

  // Calculator Methods
  openCalculator() {
    this.showCalculator = true;
    this.calculatorDisplay = '0';
    this.calculatorPreviousValue = '';
    this.calculatorOperator = '';
  }

  calculatorInput(value: string) {
    if (value === 'C') {
      this.calculatorDisplay = '0';
      this.calculatorPreviousValue = '';
      this.calculatorOperator = '';
    } else if (value === '=') {
      this.calculatorCalculate();
    } else if (['+', '-', '*', '/'].includes(value)) {
      this.calculatorPreviousValue = this.calculatorDisplay;
      this.calculatorOperator = value;
      this.calculatorDisplay = '0';
    } else {
      if (this.calculatorDisplay === '0') {
        this.calculatorDisplay = value;
      } else {
        this.calculatorDisplay += value;
      }
    }
  }

  calculatorCalculate() {
    const prev = parseFloat(this.calculatorPreviousValue);
    const current = parseFloat(this.calculatorDisplay);
    let result = 0;

    switch (this.calculatorOperator) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '*': result = prev * current; break;
      case '/': result = prev / current; break;
      default: return;
    }

    this.calculatorDisplay = result.toString();
    this.calculatorPreviousValue = '';
    this.calculatorOperator = '';
  }

  // Todo List Methods
  openTodoList() {
    this.showTodoList = true;
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    } else {
      this.todos = [];
    }
    this.newTodoText = '';
  }

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTodoText.trim(),
        completed: false
      });
      this.newTodoText = '';
      this.saveTodos();
    }
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.saveTodos();
  }

  // Todo List Getters
  get completedTodosCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  get pendingTodosCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  get hasCompletedTodos(): boolean {
    return this.completedTodosCount > 0;
  }

  // Close game modals
  closeGame(gameName: string) {
    switch(gameName) {
      case 'ticTacToe': this.showTicTacToe = false; break;
      case 'rockPaperScissors': this.showRockPaperScissors = false; break;
      case 'memory': this.showMemoryGame = false; break;
      case 'calculator': this.showCalculator = false; break;
      case 'todo': this.showTodoList = false; break;
      case 'snake': this.showSnakeGame = false; break;
    }
  }

  // Project Modal
  showProjectModal: boolean = false;
  selectedProject: any = null;

  projects = [
    {
      id: 1,
      title: 'Company Product Websites',
      description: 'The website features both company product showcases and hotel services, developed with Angular and the Ionic framework. It supports multiple languages, integrates with Google Analytics, is optimized for SEO, and includes API integration.',
      image: 'assets/images/product-image.jpg',
      modules: [
        'Product Catalog Module',
        'Hotel Booking Module',
        'User Authentication Module',
        'Admin Dashboard Module',
        'Multi-language Support Module',
        'Payment Integration Module'
      ],
      flow: [
        'User Registration/Login',
        'Browse Products/Services',
        'Select Items and Add to Cart',
        'Checkout Process',
        'Payment Processing',
        'Order Confirmation',
        'Admin Management'
      ],
      languages: ['Angular', 'Ionic', 'TypeScript', 'HTML5', 'CSS3', 'JavaScript', 'REST API']
    },
    {
      id: 2,
      title: 'Banking System',
      description: 'Developed with Wix Studio, this banking website is fully responsive across mobile, tablet, and desktop devices. It features multilingual support, an integrated CMS portal, and custom functionalities implemented using JavaScript within the Wix Studio environment.',
      image: 'assets/images/bank-image.jpg',
      modules: [
        'Account Management Module',
        'Transaction Processing Module',
        'Loan Management Module',
        'Customer Portal Module',
        'CMS Integration Module',
        'Security & Authentication Module'
      ],
      flow: [
        'Customer Registration',
        'Account Verification',
        'Dashboard Access',
        'Transaction History',
        'Fund Transfer',
        'Loan Application',
        'Document Management'
      ],
      languages: ['Wix Studio', 'JavaScript', 'HTML5', 'CSS3', 'CMS']
    },
    {
      id: 3,
      title: 'Cake Selling System',
      description: 'Built with C#, ADO.NET, and MySQL as part of a team project, this Cake Selling System provides an efficient solution for cake shops. It simplifies in-store operations and offers customers the convenience of ordering cakes online.',
      image: 'assets/images/cake.jpg',
      modules: [
        'Product Management Module',
        'Order Processing Module',
        'Inventory Management Module',
        'Customer Management Module',
        'Payment Processing Module',
        'Reporting & Analytics Module'
      ],
      flow: [
        'Customer Registration',
        'Browse Cake Catalog',
        'Add to Cart',
        'Place Order',
        'Payment Processing',
        'Order Confirmation',
        'Order Fulfillment',
        'Delivery Tracking'
      ],
      languages: ['C#', 'ADO.NET', 'MySQL', 'Windows Forms', 'SQL Server']
    }
  ];

  openProjectModal(projectId: number) {
    this.selectedProject = this.projects.find(p => p.id === projectId);
    this.showProjectModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal() {
    this.showProjectModal = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}
