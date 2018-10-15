

var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var randomString = require('random-string');
var url = "mongodb://localhost:27017/";
const { parse } = require('querystring');
var querystring = require('querystring');
var qs = require('querystring');


/*
var express = require("express");
 var myParser = require("body-parser");
 var app = express();
 
   app.use(myParser.urlencoded({extended : true}));
   app.post("/", function(request, response) {
        response.write("yesss");
     
       console.log(request); //This prints the JSON document received (if it is a JSON document)
       console.log("Post"); //This prints the JSON document received (if it is a JSON document)
       response.end("End");
 });
 
 //Start the server and make it listen for connections on port 8080
 
 app.listen(8080);
*/



http.createServer(function( req , res ){
  var coupons = new Array(5);

  

  if (req.method == 'POST') {
    var body = '';

    req.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
        req.connection.destroy();
    });

    req.on('end', function () {
        var post = qs.parse(body);
        console.log(  post   );
        console.log( body );
     
        // use post['blah'], etc.
    });
}
  else
  {
    res.write("Noo");
  }

 

res.end();

}).listen(8080);

