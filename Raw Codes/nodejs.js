var http = require('http');
var dt = require('./module1.js');
var fs = require('fs');
var url = require('url');


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    fs.appendFile('module.html', "My work" , function (err) { //Code to writing in file by file system
        if (err) throw "Appending my work "+err;
 
      });

    var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
    var q = url.parse(adr, true).query;
    var txt = q.year + " " + q.month;
 
    fs.readFile('module.html', function(err, data) { //Code to reading data from file by file system
        if( err ) throw err;
   
        res.write(data);
        res.end();
       
    });

    


    






}).listen(8080);






