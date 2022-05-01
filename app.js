var http = require('http'); // 1 - Import Node.js core module
const mqtt = require('mqtt')
var request = require("request");
const client  = mqtt.connect('mqtt://test.mosquitto.org')
var server = http.createServer(function (req, res) {   // 2 - creating server

});
/**this url for calling esp32 app and get temp and humidity */
var options = {
    uri: 'http://172.20.10.9:80',
  };
client.on('connect', function () {
    client.subscribe('presence', function (err) {
      if (!err) {
          request.get(options,(err,data)=>{
              if(!err){
                client.publish('presence', data)
              }
          })
       
      }
    })
  })
  
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
  })

server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')