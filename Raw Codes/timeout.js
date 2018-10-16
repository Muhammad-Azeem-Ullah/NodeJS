setTimeout(function() {
    console.log('Timeout ran at ' + new Date().toTimeString());
 }, 100);
 
 // store the start time
 var start = new Date();
 console.log('Enter loop at: '+start.toTimeString());
 
 // run a loop for 4 seconds
 var i = 0;
 // increment i while (current time &lt; start time + 4000 ms)

 var next_time = new Date().getTime()+4000; 

 while(new Date().getTime() < next_time) {
    i++;
 }
 console.log('Exit loop at: '
             +new Date().toTimeString()
             +'. Ran '+i+' iterations.');