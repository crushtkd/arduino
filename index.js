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
    // var anode = new five.Led.RGB({
    //     pins: {
    //         red: 9,
    //         green: 11,
    //         blue: 10
    //     },
    //     isAnode: true
    // });
    var digital = new five.Led(13);
    // commands = null;

    digital.off();
    // digital.color("#efe13d");

    // digital.blink(1000);

    var blink = true;

    io.on('connection', function(socket){
        // socket.on('azul', function(){
        //     anode.on();
        //     anode.color('#3366CC');
        // });
        // socket.on('verde', function(){
        //     anode.on();
        //     anode.color('#009900');
        // });
        // socket.on('rojo', function(){
        //     anode.on();
        //     anode.color('#FF0000');
    // });
    socket.on('stop', function (){
        if (blink){
            digital.stop(); // to stop blinking
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
