var http    = require('http');
var fs      = require('fs');
var url     = require('url');
var express = require('express');
var myParser = require("body-parser");
var app     = express();


app.use(myParser.urlencoded({extended : true}));
app.post("/", function(request, response) { 

    response.write(request.query.Input);
    response.end();


});


app.get("/", function(request, response) { 

    
    response.write(request.query.Input);
    response.end();
    
});
app.listen(8080);
