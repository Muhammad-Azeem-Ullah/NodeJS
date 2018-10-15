var express = require('express');
var app = express();


app.all('/test', function(req, res){
    res.send("HTTP method doesn't have any effect on this route!");
 });
app.get('/', function(req, res){
   res.send("empty!");
});
app.get('/bye', function(req, res){
    res.send("bye!");
 });
 app.get('/hello', function(req, res){
    res.send("Hello World!");
 });
  

app.listen(3000);

