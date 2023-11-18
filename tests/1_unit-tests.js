const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

suite('Unit Tests', () => {
    suite('Function validate()', () => {
        test('Valid puzzle string of 81 characters', (done) => {
    
          let solvedPuzzle = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
          assert.equal(solver.solve(puzzle), solvedPuzzle);
          done();
        });
    
    
        test('Puzzle string with invalid characters (not 1-9 or .)', (done) => {
          const invalidPuzzle = '..9..172.16.31.10....2432......1...69.83.9.....6.62.71...9......1945....192.168.3.11..6..a';
          assert.equal(solver.solve(invalidPuzzle), false);
          done();
    
        });
    
        test('Puzzle string that is not 81 characters in length', (done) => {
          const invalidPuzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3....';
          assert.equal(solver.solve(invalidPuzzle), false);
          done();
    
        });
    
        test('Valid row placement', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.checkRowPlacement(puzzle, 'A', 2, 3), true);
          done();
        });
    
        test('Invalid row placement', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.checkRowPlacement(puzzle, 'A', 2, 9), false);
          done();
    
        });
    
        test('Valid column placement', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.checkColPlacement(puzzle, 'A', 2, 1), true);
          done();
    
        });
    
        test('Invalid column placement', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.checkColPlacement(puzzle, 'A', 2, 9), false);
          done();
        });
    
        test('Valid region (3x3 grid) placement', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.checkRegionPlacement(puzzle, 'A', 2, 1), true);
          done();
    
        });
    
        test('Invalid region (3x3 grid) placement', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.checkRegionPlacement(puzzle, 'A', 2, 9), false);
          done();
    
        });
    
        test('Valid puzzle strings pass the solver', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.solve(puzzle), '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
          done();
    
        });
    
        test('Invalid puzzle strings fail the solver', (done) => {
          const invalidPuzzle = '..89..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.solve(invalidPuzzle), false);
          done();
        });
    
        test('Solver returns the expected solution for an incomplete puzzle', (done) => {
          const puzzle = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
          assert.equal(solver.solve(puzzle), '769235418851496372432178956174569283395842761628713549283657194516924837947381625');
          done();
        });
    
      });

});
