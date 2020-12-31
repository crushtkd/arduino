var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(3000));
var five = require('johnny-five');

app.use(express.static(__dirname + '/app'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

var board = new five.Board({
    repl:false
});

board.on('ready',function (){
    var speed, commands, motors;
    
    var digital = new five.Led(13);
   
    digital.off();
   
    var blink = true;

    io.on('connection', function(socket){
        
    socket.on('stop', function (){
        if (blink){
            digital.stop(); 
            blink = false;
        }
        else{
            digital.blink(1000);
            blink = true;
        }
    });

    socket.on('off', function (){
        digital.off();  // to shut it off (stop doesn't mean "off")
    });

    socket.on('on', function (){
        digital.on(); // to turn on, but not blink
    });
});
 
});
