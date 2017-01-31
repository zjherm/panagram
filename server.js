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
app.get('/combo', function (req, res) {
    if(!req.query.q) {
        res.send(JSON.stringify({
            "results": []
        }));
        return;
    }

    var p = combinations(req.query.q);

    var elements = [];
    for(var i=0;i<p.length;i++) {
        var anas = lookupAnagram(p[i]);
        if(!elements[p[i].length]) {
            elements[p[i].length] = [];
        }
        console.log(p[i].length, anas);
        elements[p[i].length] = arrayUnique(elements[p[i].length].concat(anas));
    }

    res.send(JSON.stringify({
        "results": elements
    }));
});

app.get('/random_word', function (req, res) {
    var pool = Object.keys(anagramDict);
    var arry = anagramDict[pool[parseInt(Math.random()*pool.length)]];
    var word = arry[parseInt(Math.random()*arry.length)];
    res.send(JSON.stringify({
        "word": word
    }));
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


// thx so http://codereview.stackexchange.com/questions/7001/generating-all-combinations-of-an-array
function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn("", str, []);
}

function lookupAnagram(text) {
    var sortedText = text.split('').sort().join('');
    return anagramDict[sortedText] || [];
}


function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}