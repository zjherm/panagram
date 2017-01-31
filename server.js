var express = require('express');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/app'));

var anagramDict = JSON.parse(fs.readFileSync('data/anagram_dict.json', 'utf8'));


function lookupAnagram(text) {
    var sortedText = text.split('').sort().join('');
    return anagramDict[sortedText];
}


// heres how you add url params. And wildcards
app.get('/query', function (req, res) {
    var response = lookupAnagram(req.query.q);
    if(!response) {
        response = [];
    }
    res.send(JSON.stringify({
        "results":response
    }));
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
