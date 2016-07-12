var WebSocketServer = require('ws').Server
, http = require('http')
, FS = require('fs')
, bodyParser = require('body-parser')
, express = require('express')
, app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var server = http.createServer(app);
server.listen(process.env.PORT);

var wss = new WebSocketServer({server: server});

wss.on('connection', function(ws) {
    ws.on('message', function(data, flags) {
        
        console.log(JSON.stringify(data));
        ws.send("{\"msg\":\"rcvd\"}");
    });
    
    ws.on('close', function() {
        console.log('stopping client interval');
    });
    
    console.log('started client interval');
});