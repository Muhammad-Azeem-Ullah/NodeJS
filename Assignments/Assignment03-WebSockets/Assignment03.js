
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var randomString = require('random-string');
var url = "mongodb://localhost:27017/";


const WebSocket = require('ws');
var express = require( "express" );
const wss = new WebSocket.Server({ port: 8081 });


wss.on('connection', ws => {
    ws.on('message', message => {

      var msg_obj = JSON.parse(message);
      if( msg_obj.mode == "generate" )
      {
        coupon_size = msg_obj.size;
        out_new = generate_coupon( coupon_size , ws );
      }
      else if ( msg_obj.mode == "redeem" )
      {
        coupon_ = msg_obj.coupon;
        out_new = redeem_coupon( coupon_ , ws );
      }
    })
    ws.send('Welcome ! ')
  });

var app = express();
app.get( '/' , function( req , res ){
  res.sendFile( __dirname + '/Ui.html' );
} );
app.listen( 8080 );



function generate_coupon( coupon_size , ws )
{
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
    var output = "";
    dbo.createCollection("Coupons" , function(err, res) {
      dbo.collection("Coupons").insertMany(coupons, function(err, res) {
        if (err) throw err;
        output +=  coupon_size +" Coupons Created Successfully<br>";
        coupons.forEach(function(element) {
          output +=  element.name + "<br>";
          });
          ws.send(JSON.stringify({
            mode : 'generate',
            response : output
          }));
        
       
      });
    });
  });
  
}

function redeem_coupon( coupon_to_redeem , ws )
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("coupon_manager");
 
    var output = '';
    var coupon = {
      name : coupon_to_redeem
    };
    dbo.collection("Coupons").find(coupon).toArray(function(err, result) {
      if (err) throw err;
      if( result.length > 0 )
      {
        dbo.collection("Coupons").deleteOne(coupon, function(err, obj) {
          dbo.collection("Coupons").find({}).toArray(function(err, all_coupons) {
            if (err) throw err;
            output += coupon + " has been redeemed <br>";
            all_coupons.forEach(function(element) {
              output += element.name + "<br>";
              });
              ws.send(JSON.stringify({
                mode : 'redeem',
                status : '200' ,
                response : output
              }));
           
          });
        });
       
      }
      else
      {
        output += "Invalid Coupon.Try Again";
        ws.send(JSON.stringify({
          mode : 'redeem',
          status : '500' ,
          response : output
        }));
    

      }
     
    });
  });
}