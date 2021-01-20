var express = require("express");
var app     = express();
var comp    = require("compression");
var http    = require("http").createServer(app);
var io      = require("socket.io")(http);

var players = [];
var boardState = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

var currTurn = 0;

//fill board with all 0's
function startBoard() {
  var boardState = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
  return boardState;
}
//check for a tie not implemneted
function checkTie(boardState) {
	if (boardState.some(row => row.includes(0))) {return false;}
	return true;
}

//check win constions
function checkWin(boardState)
{
  var check0,check1,check2,check3,check4,check5,check6,check7,check8,check9,check10,check11,check12;
  check0=check1=check2=check3=check4=check5=check6=check7=check8=check9=check10=check11=check12="";
  //win will contain either 5 1s or 5 2s in a row
  //allvertical
  player1win="11111";
  player2win="22222";
  for(i=0;i<6;i++)
  {
    check0 += boardState[i][0]+'';
    check1 += boardState[i][1]+'';
    check2 += boardState[i][2]+'';
    check3 += boardState[i][3]+'';
    check4 += boardState[i][4]+'';
    check5 += boardState[i][5]+'';
    check6 += boardState[i][6]+'';
    check7 += boardState[i][7]+'';
    check8 += boardState[i][8]+'';
    if(check0.includes(player1win)||check1.includes(player1win)||
    check2.includes(player1win)||check3.includes(player1win)||
    check4.includes(player1win)||check5.includes(player1win)||
    check6.includes(player1win)||check7.includes(player1win)||
    check8.includes(player1win))
    { return 1}
    if(check0.includes(player2win)||check1.includes(player2win)||
    check2.includes(player2win)||check3.includes(player2win)||
    check4.includes(player2win)||check5.includes(player2win)||
    check6.includes(player2win)||check7.includes(player2win)||
    check8.includes(player2win))
    { return 2}
  }
  check0=check1=check2=check3=check4=check5=check6=check7=check8=check9=check10=check11=check12="";
  //allhorizonatal
  for(i=0;i<9;i++)
  {
    check0 += boardState[0][i]+'';
    check1 += boardState[1][i]+'';
    check2 += boardState[2][i]+'';
    check3 += boardState[3][i]+'';
    check4 += boardState[4][i]+'';
    check5 += boardState[5][i]+'';

    if(check0.includes(player1win)||check1.includes(player1win)||
    check2.includes(player1win)||check3.includes(player1win)||
    check4.includes(player1win)||check5.includes(player1win))
    { return 1}
    if(check0.includes(player2win)||check1.includes(player2win)||
    check2.includes(player2win)||check3.includes(player2win)||
    check4.includes(player2win)||check5.includes(player2win))
    { return 2}
  }
  check0=check1=check2=check3=check4=check5=check6=check7=check8=check9=check10=check11=check12="";

  //1 diagonals
  check0=boardState[1][0]+''+boardState[2][1]+''+boardState[3][2]+''+boardState[4][3]+''+boardState[5][4];
  check1=boardState[0][0]+''+boardState[1][1]+''+boardState[2][2]+''+boardState[3][3]+''+boardState[4][4]+''+boardState[5][5];
  check2=boardState[0][1]+''+boardState[1][2]+''+boardState[2][3]+''+boardState[3][4]+''+boardState[4][5]+''+boardState[5][6];
  check3=boardState[0][2]+''+boardState[1][3]+''+boardState[2][4]+''+boardState[3][5]+''+boardState[4][6]+''+boardState[5][7];
  check4=boardState[0][3]+''+boardState[1][4]+''+boardState[2][5]+''+boardState[3][6]+''+boardState[4][7]+''+boardState[5][8];
  check5=boardState[0][4]+''+boardState[1][5]+''+boardState[2][6]+''+boardState[3][7]+''+boardState[4][8];
  check6=boardState[0][4]+''+boardState[1][3]+''+boardState[2][2]+''+boardState[3][1]+''+boardState[4][0];
  check7=boardState[0][5]+''+boardState[1][4]+''+boardState[2][3]+''+boardState[3][2]+''+boardState[4][1]+''+boardState[5][0];
  check8=boardState[0][6]+''+boardState[1][5]+''+boardState[2][4]+''+boardState[3][3]+''+boardState[4][2]+''+boardState[5][1];
  check9=boardState[0][7]+''+boardState[1][6]+''+boardState[2][5]+''+boardState[3][4]+''+boardState[4][3]+''+boardState[5][2];
  check10=boardState[0][8]+''+boardState[1][7]+''+boardState[2][6]+''+boardState[3][5]+''+boardState[4][4]+''+boardState[5][3];
  check11=boardState[1][8]+''+boardState[2][7]+''+boardState[3][6]+''+boardState[4][5]+''+boardState[5][4];

  if(check0.includes(player1win)||check1.includes(player1win)||
  check2.includes(player1win)||check3.includes(player1win)||
  check4.includes(player1win)||check5.includes(player1win)||
  check6.includes(player1win)||check7.includes(player1win)||
  check8.includes(player1win)||check9.includes(player1win)||
  check10.includes(player1win)||check11.includes(player1win))
  { return 1}
  if(check0.includes(player2win)||check1.includes(player2win)||
  check2.includes(player2win)||check3.includes(player2win)||
  check4.includes(player2win)||check5.includes(player2win)||
  check6.includes(player2win)||check7.includes(player2win)||
  check8.includes(player2win)||check9.includes(player2win)||
  check10.includes(player2win)||check11.includes(player2win))
  { return 2}
  else {
    return 0
  }
}

//check if there is space left in the chose column
function checkColumn(col,boardState)
{
    for(i =0;i<6;i++){
      if(boardState[i][col-1]==0&&boardState[i][col-1]!= undefined){return true;}
    }
    return false;
}

//when socket sends a connection message create a new player
if (process.env.NODE_ENV !== 'test')
{
io.on('connection', function(socket) {

    var newPlayer = {
        socket: socket,
        name: "",
        role: 0

    };

    socket.on("start", function() {
      if(players[0] == undefined){
        socket.emit("connected", 1);
        newPlayer.role = 1;
        players[0] = newPlayer;
        startBoard();
      }
      else if(players[1] == undefined) {
        socket.emit("connected", 2);
        newPlayer.role = 2;
        players[1] = newPlayer;
      }else {
        console.log("too many players");
        socket.emit("errorMsg", "not enough space please try later or watch the current match");
        //disconnect

      }
      console.log("Player joined as " + newPlayer.role);
      socket.emit("newBoard", boardState);

      if(players[0]&& players[1]) {
        players[0].socket.emit("turn");
        currTurn = 1;
      }
    });

    socket.on("placePiece", function(col) {
      console.log("Placing piece as " + newPlayer.role + " at " + col);
        //console.log(boardState);
        //console.log(col);
        //controll whose turn it is
        if(newPlayer.role === 1 || newPlayer.role === 2) {
            if(newPlayer.role !== currTurn) {
                socket.emit("errorMsg", "It is not your turn yet");
            }//check if there is space
            else if (!checkColumn(col,boardState)) {
                socket.emit("errorMsg", "Invalid piece placement");
            }
            else {//place pirece find the gap and drop it
                console.log("pushed");
                for(i =0;i<6;i++)
                {
                  if(boardState[i][col-1]==0)
                  {
                    boardState[i][col-1]=newPlayer.role;
                    break;
                  }
                }
                //update the players boards
                players[0].socket.emit("newBoard", boardState);
                players[1].socket.emit("newBoard", boardState);

                ///check if anyone has won
                var win = checkWin(boardState);
                var tie = checkTie(boardState);
                if (!win==0) {
                  players[0].socket.emit("winner", win);
                  players[1].socket.emit("winner", win);
                }else if(tie)
                {
                  players[0].socket.emit("tie");
                  players[1].socket.emit("tie");

                }
                  else { ///swap turns
                    if (currTurn == 1) {
                      currTurn = 2;
                      players[1].socket.emit("turn");
                      players[0].socket.emit("notturn");
                    }
                    else{
                      currTurn = 1;
                      players[0].socket.emit("turn");
                      players[1].socket.emit("notturn");
                    }
                  }
                }
              }
            });

            socket.on('disconnect', function() {
              if(newPlayer.role == 1) {
                delete players[0];
                console.log("disconnect");
              }
              else if(newPlayer.role == 2) {
                delete players[1];
              }
            });
          });

          app.use(comp());
          app.use(express.static(__dirname + '/client'));
          var port = process.env.PORT  || 8080;
          http.listen(port,function() {
            console.log("listening on:" + port);

          });}

          module.exports.startBoard = startBoard;
          module.exports.checkTie = checkTie;
          module.exports.checkWin = checkWin;
          module.exports.checkColumn = checkColumn;

          /*list of socket events being listened for
          connection with
          var newPlayer
              socket: socket,
              name: "",
              role:

          start
          disconnect


          */
