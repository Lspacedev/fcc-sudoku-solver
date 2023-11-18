'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let puzzle = req.body.puzzle;
      let coordinate = req.body.coordinate;
      let value = req.body.value;
      let regex1 = /^[a-iA-I][1-9]$/;

      //required field missing
      if (!puzzle || !coordinate || !value) {
        res.json({ error: 'Required field(s) missing' });
        return;

      }else if (puzzle.length == 0 || coordinate.length == 0 || value.length == 0) {
        res.json({ error: 'Required field(s) missing' });
        return;

      }else if (puzzle == undefined || coordinate == undefined || value == undefined) {
        res.json({ error: 'Required field(s) missing' });
        return;
      }
      
      //Invalid coordinate
      
      if (!(regex1).test(coordinate)) {
        res.json({ error: 'Invalid coordinate'});
        return;

      }
      if (puzzle.length != 81) {
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        return;
      
      }
      if (!/^[1-9.]+$/.test(puzzle)){
        res.json({ error: 'Invalid characters in puzzle' });
        return;
      }

      if(!(/^[1-9]$/.test(value))) {
        res.json({ error: 'Invalid value' });
        return;

      }
  

      let row = coordinate.split('')[0];
      let col = coordinate.split('')[1];

      let rowCheck = solver.checkRowPlacement(puzzle, row, col, value);
      let colCheck = solver.checkColPlacement(puzzle, row, col, value);
      let regionCheck = solver.checkRegionPlacement(puzzle, row, col, value);
      let conflict = [];
    
      if(rowCheck && colCheck && regionCheck) {
        res.json({ valid: true });
        return;
      } else {
        if (!rowCheck) {
          conflict.push('row');
        }
        if (!colCheck) {
          conflict.push('column');
        }
        if (!regionCheck) {
          conflict.push('region');
        }
        res.json({ valid: false, conflict: conflict });
        return;
      }
      
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;
      //let isValid = false;

     /* let row1 = puzzle.slice(0,3);
      let row2 = puzzle.slice(10, 12)
      console.log(row1)
      console.log(row2)*/

      if(!puzzle){
         res.json({ error: 'Required field missing' });
        return;
      }
      if(puzzle.length !== 81){
        res.json({ error: 'Expected puzzle to be 81 characters long' });
        //isValid = true;
        return;
      }

      if(/[^0-9.]/g.test(puzzle)){
        res.json({ error: 'Invalid characters in puzzle' });
       // isValid = true;
        return;
      }

      let solved = solver.solve(puzzle);
      if(!solved){
        res.json({ error: 'Puzzle cannot be solved' });
      }else {
        res.json({ solution: solved });
      }
    });
};
