var client = require('./client')


/*client.setHeader(s);
client.drawBoard(boardstate);
client.setupSocket();
client.addListeners();*/

test('should be defined',()=>{
expect(client).toBeDefined()
})

test('board being drawn',()=>{

const board = [[0,0,0,1,0,0,0,0,0],[2,0,0,0,0,0,0,0,0],[0,0,1,0,0,0,0,0,0],
[0,0,0,0,2,0,0,0,0],[0,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

const drawnBoard = "\n [  ]  [  ]  [  ]  [  ]  [  ]  [  ]  [  ]  [  ]  [  ] \n [  ]  [  ]  [  ]  [  ]  [R]  [  ]  [  ]  [  ]  [  ] \n [  ]  [  ]  [  ]  [  ]  [R]  [  ]  [  ]  [  ]  [  ] \n [  ]  [  ]  [Y]  [  ]  [  ]  [  ]  [  ]  [  ]  [  ] \n [R]  [  ]  [  ]  [  ]  [  ]  [  ]  [  ]  [  ]  [  ] \n [  ]  [  ]  [  ]  [Y]  [  ]  [  ]  [  ]  [  ]  [  ] \n"
expect(client.drawBoard(board)).toEqual(drawnBoard);

})

test('listeners added to buttons',()=>
{
  expect(client.addListeners()).toBeTruthy();
})
