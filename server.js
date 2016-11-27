const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port | 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log("cannot write file");
		}
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


app.get('/', (req, res) => {
	var data = {
		pageTitle: "Home"
	};
	data.welcomeMessage = "Welcome to our new website.";
	res.render('home.hbs',data);
});



app.get('/about', (req, res) => {
	var data = {
		pageTitle: "About us"
	};
	res.render('about.hbs',data);
});

app.get('/projects', (req, res) => {
	var data = {
		pageTitle: "Projects",
		body: "Here is an extensive list of my projects"
	};
	res.render('projects.hbs',data);
});


app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "Unable to handle request"
	});
});

app.listen(port, () => {
	console.log(`Server is up and running on ${port}`)
});