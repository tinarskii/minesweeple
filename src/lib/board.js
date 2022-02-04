import moment from 'moment';

class Cell {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.isMine = false;
    this.isFlagged = false;
    this.isRevealed = false;
    this.neighborMines = 0;
  }
}

export default class MineSweeper {
  constructor (rows, cols, mines) {
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.board = this.createBoard();
    this.gameOver = false;
    this.startTime = null;
    this.endTime = null;
    this.moves = 0;
    
    this.placeMines();
    this.setNeighborsMineCount();
  }
  
  createBoard () {
    let board = [];
    for (let i = 0; i < this.rows; i ++) {
      board.push([]);
      for (let j = 0; j < this.cols; j ++) {
        board[i].push(new Cell(i, j));
      }
    }
    return board;
  }
  
  placeMines () {
    if (this.mines > this.rows * this.cols) {
      this.mines = this.rows * this.cols;
    }
    
    let minesPlaced = 0;
    while (minesPlaced < this.mines) {
      let randomRow = Math.floor(Math.random() * this.rows);
      let randomCol = Math.floor(Math.random() * this.cols);
      if (!this.board[randomRow][randomCol].isMine) {
        this.board[randomRow][randomCol].isMine = true;
        minesPlaced ++;
      }
    }
  }
  
  setNeighborsMineCount () {
    for (let i = 0; i < this.rows; i ++) {
      for (let j = 0; j < this.cols; j ++) {
        let cell = this.board[i][j];
        if (cell.isMine) {
          continue;
        }
        let neighbors = this.getNeighbors(cell);
        let neighborMines = 0;
        for (let neighbor of neighbors) {
          if (neighbor.isMine) {
            neighborMines ++;
          }
        }
        cell.neighborMines = neighborMines;
      }
    }
  }
  
  getNeighbors (cell) {
    let neighbors = [];
    let row = cell.x;
    let col = cell.y;
    for (let i = row - 1; i <= row + 1; i ++) {
      for (let j = col - 1; j <= col + 1; j ++) {
        if (i < 0 || i >= this.rows || j < 0 || j >= this.cols) {
          continue;
        }
        if (i === row && j === col) {
          continue;
        }
        neighbors.push(this.board[i][j]);
      }
    }
    return neighbors;
  }
  
  printBoard () {
    for (let i = 0; i < this.rows; i ++) {
      let row = '';
      for (let j = 0; j < this.cols; j ++) {
        let cell = this.board[i][j];
        if (cell.isRevealed) {
          if (cell.isMine) {
            row += '* ';
          } else {
            row += cell.neighborMines + ' ';
          }
        } else if (cell.isFlagged && !this.gameOver) {
          row += 'F ';
        } else if (this.gameOver) {
          if (cell.isMine && cell.isFlagged) {
            row += 'X ';
          } else if (cell.isMine) {
            row += '* ';
          } else {
            row += '- ';
          }
        } else {
          row += '? ';
        }
      }
      return row;
    }
  }
  
  revealCell (cell) {
    if (this.gameOver || cell.isRevealed || cell.isFlagged) {
      return;
    }
    
    this.moves += 1;
  
    if (cell.isMine) {
      this.endTime = new Date().getTime();
      this.gameOver = true;
      cell.isRevealed = true;
      return this.printBoard();
    }
    
    if (cell.neighborMines === 0) {
      let neighbors = this.getNeighbors(cell);
      for (let neighbor of neighbors) {
        if (!neighbor.isRevealed && !neighbor.isFlagged) {
          neighbor.isRevealed = true;
          this.revealCell(neighbor);
        }
      }
    }
    
    cell.isRevealed = true;
    
    if (this.isGameWon()) {
      this.endTime = new Date().getTime();
      this.gameOver = true;
      return this.printBoard();
    }
  }
  
  isGameWon () {
    for (let i = 0; i < this.rows; i ++) {
      for (let j = 0; j < this.cols; j ++) {
        if (!this.board[i][j].isRevealed && !this.board[i][j].isMine) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  flagCell (cell) {
    if (this.gameOver) {
      return;
    }
    
    if (cell.isRevealed) {
      return;
    }
    
    let flaggedCells = this.getFlaggedCells();
    
    if (!cell.isFlagged === true && flaggedCells.length + 1 > this.mines) {
      return;
    }
    
    cell.isFlagged = !cell.isFlagged;
    return this.printBoard();
  }
  
  getFlaggedCells() {
    let flaggedCells = [];
    for (let i = 0; i < this.rows; i ++) {
      for (let j = 0; j < this.cols; j ++) {
        if (this.board[i][j].isFlagged) {
          flaggedCells.push(this.board[i][j]);
        }
      }
    }
    return flaggedCells;
  }
  
  startGame () {
    this.startTime = new Date().getTime();
    this.gameOver = false;
  }
  
  getPlayTime () {
    return moment.duration(this.endTime - this.startTime, 'milliseconds')
      .humanize();
  }
  
  getWordleResult() {
    let wordleResult = '';
    for (let i = 0; i < this.rows; i ++) {
      for (let j = 0; j < this.cols; j ++) {
        let cell = this.board[i][j];
        if (!cell.isMine && cell.isFlagged) {
          wordleResult += '❌';
        } else if (cell.isMine && cell.isFlagged) {
          wordleResult += '🚩';
        } else if (cell.isMine) {
          wordleResult += '💣';
        } else {
          wordleResult += this.getNumberEmoji(cell.neighborMines);
        }
      }
      wordleResult += '\n';
    }
    return wordleResult;
  }
  
  getNumberEmoji(neighborMines) {
    switch (neighborMines) {
      case 1:
        return '1️⃣';
      case 2:
        return '2️⃣';
      case 3:
        return '3️⃣';
      case 4:
        return '4️⃣';
      case 5:
        return '5️⃣';
      case 6:
        return '6️⃣';
      default:
        return '0️⃣';
    }
  }
  
  getCorrectFlags() {
    let correctFlags = 0;
    for (let i = 0; i < this.rows; i ++) {
      for (let j = 0; j < this.cols; j ++) {
        let cell = this.board[i][j];
        if (cell.isMine && cell.isFlagged) {
          correctFlags += 1;
        }
      }
    }
    return correctFlags;
  }
}