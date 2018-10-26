
var http              = require('http');
var MongoClient       = require('mongodb').MongoClient;
var randomString      = require('random-string');
var url               = "mongodb://localhost:27017/";


const WebSocket       = require('ws');
var express           = require( "express" );




module.exports.generate_coupon  = function generate_coupon( coupon_count  )
{
    var coupons = [] ;
    if( Number.isInteger( parseInt ( coupon_count ) )  ){
        for(var i = 0; i < coupon_count ;i++){
          coupon =  { name: randomString() };
          coupons.push( coupon );
        }
      }

      return coupons;
  
}

module.exports.send_coupons_to_ws  = function send_coupons_to_ws( coupons , ws )
{
    var output            = coupon_count + " coupons has been added <br>";


    
    coupons.forEach(function(element) {
    output += element.name + "<br>";
    });
    ws.send(JSON.stringify({
      mode : 'generate',
      status : '200' ,
      response : output
    }));
  
}



