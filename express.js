var express = require('express');
var fs = require('fs');
var app = express();
var path = require("path");

//Require the module required for using form data
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
//app.use(express.static(__dirname + '/Images'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/guestbook', function (req, res) {
    res.sendFile(__dirname + '/guestbook.html');
});

app.get('/newmessage', function (req, res) {
    res.sendFile(__dirname + '/newmessage.html');
});

app.post('/newmessage', function(req, res) {
    //load the existing data from the file
    var data = require('./data.json');

    //Check if any of the required fields are empty
    if(!req.body.username || !req.body.country || !req.body.message) {
        res.send('One or more fields are empty. Please fill in all required fields.');
    } else {
        //Create a new JSON object and add it to the existing data variable
        data.push({
            "username": req.body.username,
            "country": req.body.country,
            "message": req.body.message,
            "date": new Date()
        });
        //Convert the JSON object to a string format
        var jsonStr = JSON.stringify(data);
        //Write data to the file
        fs.writeFile('data.json', jsonStr, (err) => {
            if (err) throw err;
            console.log('It is saved!!');
        });
        res.send('Saved the data to the file!!');
    }
});

app.get('/ajaxmessage', function (req, res) {
    res.sendFile(__dirname + '/ajaxmessage.html');
});

app.post('/ajaxmessage', (req, res) => {
    if(!req.body.name || !req.body.country || !req.body.message) {
        res.send('One or more fields are empty. Please fill in all required fields.');
    }else{
	const name = req.body.name;
	const country = req.body.country;
    const message = req.body.message;
	res.send(`Name: ${name}, Country: ${country}, Message: ${message}`);
    }
});

app.get('/*', function (req, res) {
    res.send('cant find requested page!!', 404);
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!!!');
});