var $;
var socket;
var boardState;
var isCurrentTurn = false;
var player;

document.addEventListener("DOMContentLoaded", function(event) {
  setupSocket();
  setHeader("Waiting for server...");
  addListeners();
  });

function setHeader(s) {
	$(".header").html(s);
}
// TODO clean up buttons and buuton listeners
//buttons show wrong number because draw function and upsidedown-ness
function addListeners()
{
  // for testing comment out lines were used to skip certain lines of code not accessible by jest
  //process.env.NODE_ENV can only be used serverside
  //if (process.env.NODE_ENV !== 'test')
  //{
        document.querySelector('#f1').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button1').value);
            e.preventDefault();
        });
        document.querySelector('#f2').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button2').value);
            e.preventDefault();
        });
        document.querySelector('#f3').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button3').value);
            e.preventDefault();
        });
        document.querySelector('#f4').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button4').value);
            e.preventDefault();
        });
        document.querySelector('#f5').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button5').value);
            e.preventDefault();
        });
        document.querySelector('#f6').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button6').value);
            e.preventDefault();
        });
        document.querySelector('#f7').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button7').value);
            e.preventDefault();
        });
        document.querySelector('#f8').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button8').value);
            e.preventDefault();
        });
        document.querySelector('#f9').addEventListener('submit', function (e) {
            socket.emit('placePiece', document.querySelector('#button9').value);
            e.preventDefault();
        });
    //  }
        return true;
}
//draw the connect 5 board
function drawBoard(boardstate)
{
  var result="\n";
  for(i=5; i>=0;i--)
  {
    for(y=0;y<9;y++)
    {
      if(boardstate[i][y]==1)
      {
        result+= " [Y] ";
      }
      else if (boardstate[i][y]==2)
      {
        result+= " [R] ";
      }
      else{
        result+= " [  ] ";
      }

    }
    result+= "\n";
  }
  // for testing below if was used to skip certain lines of code not accessible by jest
  //if (process.env.NODE_ENV !== 'test')
//  {
    $("#board").val(result)
//  }
  return result;
}

function setupSocket() {
    if(!socket) {
        socket = io.connect();
    };

    socket.on("connected", function(role) {
		player = role;
    setHeader("Connected to server. Waiting for player...");

    });

    socket.on("newBoard", function(board) {
        console.log('new board');
        boardState = board;
        drawBoard(boardState);
    });

    socket.on("turn", function() {
        console.log("my turn");
		isCurrentTurn = true;
		setHeader("Your turn!");
});
    socket.on("notturn", function() {
        console.log("my turn");
		isCurrentTurn = false;
		setHeader("Opponents turn!");
  });

  socket.on("winner", function (winner) {
    if (player == winner) {
      setHeader("You've won!");
    }
    else if (winner == -1) {
      setHeader("It's a tie!");
    }
    else {
      setHeader("Player " + winner + " won!");
		}
    });
    socket.on("tie", function () {

        setHeader("It's a tie! please try again");

      });

    socket.on("reset", function () {
      setHeader("Waiting to start...");

    });

    socket.on("errorMsg", function(msg) {
        console.log(msg);
        alert(msg);
    });

    socket.emit("start");
}
module.exports.setHeader = setHeader;
module.exports.drawBoard = drawBoard;
module.exports.addListeners = addListeners;
module.exports.setupSocket = setupSocket;
