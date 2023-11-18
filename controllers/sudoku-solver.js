class SudokuSolver {

  validate(puzzleString) {
  }

  convertToNum(row){
    let rowAlpha = row.toUpperCase();
      switch (rowAlpha) {
        case "A":
          return 1;
        case "B":
          return 2;
        case "C":
          return 3;
        case "D":
          return 4;
        case "E":
          return 5;
        case "F":
          return 6;
        case "G":
          return 7;
        case "H":
          return 8;
        case "I":
          return 9;
        default:
          return "none";
      }
  }

  checkRowPlacement(puzzleString, row, col, value) {
    let grid = this.makeGrid(puzzleString);
    row = this.convertToNum(row);
  
    if(grid[row - 1][col - 1] == value) return true;
    for (let i = 0; i < 9; i++) {
      if (grid[row - 1][i] == value) return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, col, value) {
    let grid = this.makeGrid(puzzleString);
    row = this.convertToNum(row);
    
    if(grid[row - 1][col - 1] == value) return true;
    for (let i = 0; i < 9; i++) {
      if (grid[i][col - 1] == value) return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid = this.makeGrid(puzzleString);
    row = this.convertToNum(row);
  
    if(grid[row - 1][col - 1] == value) return true;
    
    let rowStart = row - row % 3,
    colStart = col - col % 3;
  
    for(let i = 0; i < 3; i++) {
      for(let k = 0; k < 3; k++){
        if(grid[i + rowStart][k + colStart] == value) return false;
      } 
    }
    return true;
  
  }

  solveSudoku(grid, row, col){
    let N = 9;
    if (row == N - 1 && col == N) return grid;
    if (col == N){
        row++;
        col = 0;
    }


    if (grid[row][col] != 0) return this.solveSudoku(grid, row, col + 1);

    for(let num = 1; num < 10; num++){
        if (this.isSafe(grid, row, col, num)){
            grid[row][col] = num;
            if (this.solveSudoku(grid, row, col + 1)) return grid;
        }
        grid[row][col] = 0;
    }
    return false;
  }

  isSafe(grid, row, col, num){
    for(let x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;


    for(let x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;


    let startRow = row - row % 3, 
        startCol = col - col % 3;

    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (grid[i + startRow][j + startCol] == num)
                return false;

    return true;
  }

  makeGrid(puzzleString) {
    let grid = [
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0],
              ];
    let row = -1;
    let col = 0;
    for(let i = 0; i < puzzleString.length; i++){
      if(i % 9 == 0){
        row++;
      }
      if(col % 9 == 0){
        col = 0;
      }
      grid[row][col] = puzzleString[i] === '.' ? 0 : +puzzleString[i];
      col++;
    }
    return grid;
    
  }
  resetGrid(grid) {
    return grid.flat().join("");
  }

  solve(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }
    if (/[^0-9.]/g.test(puzzleString)) {
      return false;
    }
    let grid = this.makeGrid(puzzleString);
    let solve = this.solveSudoku(grid, 0, 0);
    if (solve == false){
      return false;
    }
    let solved = this.resetGrid(solve);
    return solved;
  
  } 

}

module.exports = SudokuSolver;

















