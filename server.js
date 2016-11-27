const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		console.log("cannot write file");
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});


var coreData = (pageTitle) => {
	return {
		pageTitle: "Home"
	};
};

app.get('/', (req, res) => {
	var data = coreData("Home");
	data.welcomeMessage = "Welcome to our new website.";
	res.render('home.hbs',data);
});



app.get('/about', (req, res) => {
	var data = coreData("About us");
	res.render('about.hbs',data);
});


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "Unable to handle request"
	});
});

app.listen(3000);