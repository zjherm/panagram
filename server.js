var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/app'));


// heres how you add url params. And wildcards
app.get('/test/:myVar/*', function (req, res) {
   res.send('You typed in ' + req.params.myVar);
})
// simple echo post. It spits back what it saw to you
app.post('/test/echo', function (req, res, next) {
	// JS is all async so you have to do these event listeners to receive
	// the post content body :(

	// scoop up all the data and store it
    var data='';
    req.on('data', function(chunk) { 
       data += chunk;
    });

    // when the request is fully xfered then send back what
    // we saw to them.
    req.on('end', function() {
        res.send(data);
        next(); // tell express this method is done, goto next.
    });
})

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
