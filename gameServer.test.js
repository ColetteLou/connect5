var gameServer = require('./gameServer')

/*gameServer.startBoard
gameServer.checkTie;
gameServer.checkWin;
gameServer.checkColumn;*/

test('should be defined',()=>{
expect(gameServer).toBeDefined()
})

test('startBoard creates blank board',()=>
{
  var board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
  expect(gameServer.startBoard()).toStrictEqual(board);

})

test('checkTie',()=>{
  var board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
  var tieBoard = [[1,1,2,1,2,2,2,1,1],[2,1,2,1,2,1,2,1,1],[1,2,1,2,1,2,1,1,1],
  [1,1,1,1,1,1,2,1,1],[1,2,1,1,1,1,1,2,1],[1,1,2,1,1,1,1,1,1]];

  expect(gameServer.checkTie(board)).toBe(false);
  expect(gameServer.checkTie(tieBoard)).toBe(true);


})

test('checkWin',()=>{

  // add test cast for every possible winning board???
  var winningBoardPlayer1 =[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],[0,0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0,0]];
  var winningBoardPlayer2= [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],[0,0,2,2,2,2,2,0,0],[0,0,0,0,0,0,0,0,0]];
  var noWinBoard = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,2,0,0,0,0],[0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,2,0,0,0],[0,0,0,0,0,0,0,0,1],[0,0,0,2,0,0,0,0,0]];

  expect(gameServer.checkWin(winningBoardPlayer1)).toBe(1);
  expect(gameServer.checkWin(winningBoardPlayer2)).toBe(2);
  expect(gameServer.checkWin(noWinBoard)).toBe(0);
})

test('checkColumn', ()=>{

  //add more check for each column??
  var fullFirstColumn = [[1,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0]];
  var notFullColumn =[[1,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
  expect(gameServer.checkColumn(1,fullFirstColumn)).toBe(false);
  expect(gameServer.checkColumn(2,fullFirstColumn)).toBe(true);
  expect(gameServer.checkColumn(1,notFullColumn)).toBe(true);


})
