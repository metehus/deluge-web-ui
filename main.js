var http = require('http');
var zlib = require('zlib');

module.exports = {
    request: function (method, params=[], cb, cookie=false) {


        var payload ={
            'method' : method,
            'params' : params,
            'id'     : Math.floor(Math.random() * 1000)
          };
          
          //make payload a string for http request
          payload = JSON.stringify(payload);
          
          //set auth cookie if already authenticated
          var head;
          if(cookie != false){
            head = {
                'Cookie': cookie
            };
          }
          
          
          //setup our http request parameters
          var options = {
            hostname: "192.168.25.180",
            port: 8112,
            path: '/json',
            method: 'POST',
            headers: head
          };
          
          var req = http.request(options, function(res) {
          
            var gunzip = zlib.createGunzip();
            res.pipe(gunzip);
          
            var buffer = [];
            gunzip.on('data', function (chunk) {
                buffer.push(chunk.toString())
            });
            gunzip.on('end', function() {
              cb({data: JSON.parse(buffer.join("")), res: res});

            })  
          
          
          });
          
          //output http request errors to console
          req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
          });
          
          // write data to request body
          req.write(payload);
          req.end();
    }
}