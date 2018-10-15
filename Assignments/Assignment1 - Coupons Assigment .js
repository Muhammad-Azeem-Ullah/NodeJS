

var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var randomString = require('random-string');
var url = "mongodb://localhost:27017/";


var express = require("express");
var myParser = require("body-parser");
var app = express();
 
app.use(myParser.urlencoded({extended : true}));
app.post("/generate-coupons", function(request, response) {   


    coupon_size = request.query.coupon_size; 
  
   
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("coupon_manager");
   
     
      var coupons = [];


      if( Number.isInteger( parseInt ( coupon_size ) )  ){
        for(var i = 0; i < coupon_size ;i++){

          coupon =  { name: randomString() };
          coupons.push( coupon );
  
        

        }

      }

      dbo.createCollection("Coupons");

      dbo.collection("Coupons").insertMany(coupons, function(err, res) {
        if (err) throw err;
        response.write(  coupon_size +" Coupons Created Successfully\n");
        coupons.forEach(function(element) {
          response.write( element.name + "\n" );
          });
        response.end();
      
      });
    });
    console.log("Post"); //This prints the JSON document received (if it is a JSON document)
 
  });


  app.post("/redeem-coupon", function(request, response) {   


    coupon_to_redeem = request.query.coupon; 
  
   
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("coupon_manager");
   
     
      var coupon = {
        name : coupon_to_redeem
      };

      dbo.collection("Coupons").find(coupon).toArray(function(err, result) {
        if (err) throw err;
        console.log( "working" + result.length );
        if( result.length > 0 )
        {
          dbo.collection("Coupons").deleteOne(coupon, function(err, obj) {
            
            dbo.collection("Coupons").find({}).toArray(function(err, all_coupons) {
              if (err) throw err;

              all_coupons.forEach(function(element) {
                response.write( element.name + "\n" );
                });
                response.end();
             
            });
          });
        }
        console.log( result );
    
      
      });
    });
    console.log("Post"); //This prints the JSON document received (if it is a JSON document)
 
  });
 
 //Start the server and make it listen for connections on port 8080
 
 app.listen(8080);


