var express = require('express');
var _ = require('./underscore-min');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/app'));

var anagramDict = JSON.parse(fs.readFileSync('data/anagram_dict.json', 'utf8'));

// basic query functionality
app.get('/query', function (req, res) {
    var response = lookupAnagram(req.query.q);
    if(req.query.filter) {
        // filter results by first character matching
        response = _.filter(response, function(v) {
           return v[0] == req.query.filter[0];
        });
    }
    if(!response) {
        response = [];
    }
    res.send(JSON.stringify({
        "results":response
    }));
});
// heres how you add url params. And wildcards
app.get('/variants', function (req, res) {

});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


function lookupAnagram(text) {
    var sortedText = text.split('').sort().join('');
    return anagramDict[sortedText];
}