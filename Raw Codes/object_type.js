

var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var randomString = require('random-string');


var express = require("express");
var myParser = require("body-parser");
var app = express();

var fruits = [];
var myobj = { name: randomString() };

fruits.concat(myobj );
var myobj = { name: randomString() };
fruits.concat(myobj );
fruits.push(myobj);
fruits.push(myobj);
console.log(  fruits );
fruits.forEach(function(element) {


        console.log( element.name );
});


