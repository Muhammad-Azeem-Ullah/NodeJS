
var http              = require('http');
var MongoClient       = require('mongodb').MongoClient;
var randomString      = require('random-string');
var url               = "mongodb://localhost:27017/";


const WebSocket       = require('ws');
var express           = require( "express" );
const wss             = new WebSocket.Server({ port: 8081 });

const database_name   = 'coupon_manager';
const db_coupon_collection   = 'Coupons';


const controller_generate_coupon = require("./Controllers/generate-coupon-controller.js");
const controller_redeem_coupon   = require("./Controllers/redeem-coupon-controller.js");
const controller_mongo   = require("./Controllers/mongo-controller.js");

var app = express();



const database_promise = new Promise(function(resolve, reject) {

  try
  {
    controller_mongo.create_connection( database_name , db_coupon_collection ); //To Database 
    resolve('fine');
  }
  catch(ex)
  {
    reject('error');

  }
});
database_promise
  .then(function whenOk(response) {
    wss.on('connection', ws => {
      ws.on('message', message => {
  
        var msg_obj = JSON.parse(message);
        if( msg_obj.mode == "generate" )
        {
          coupon_count           = msg_obj.size;
          coupons               = controller_generate_coupon.generate_coupon( coupon_count );
          controller_mongo.save_generated_coupons( coupons );
          controller_generate_coupon.send_coupons_to_ws( coupons , ws );
       
         
        }
        else if ( msg_obj.mode == "redeem" )
        {
          coupon_ = msg_obj.coupon;
          out_new = controller_redeem_coupon.redeem_coupon( coupon_ , ws );

        }
      })
      ws.send('Welcome ! ')
    });
  
    
  app.get( '/' , function( req , res ){
  
    res.sendFile( __dirname + '/Views/Ui.html' );
  } );
  app.listen( 8080 );



  })
  .catch(function notOk(err) {
    console.error(err)
  });








