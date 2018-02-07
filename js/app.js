const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');

const [HOST, PORT] = ['127.0.0.1', 3000];
// const colors = [
// 	'red',
// 	'orange',
// 	'yellow',
// 	'green',
// 	'blue',
// 	'purple'
// ];

app.get('/', (req, res) => {
	const name = req.cookies.username;
	if(name) res.render(`index.pug`, {name});
	else res.redirect('/hello');
});

app.get('/cards', (req, res) => {
	res.render(`card`, {
		prompt: `Who is buried in Grant's tomb?`,
		hint: `Think about whose tomb it is.`
	});
});

app.get('/hello', (req, res) => {
	const name = req.cookies.username;
	if(name) res.redirect('/');
	else res.render('hello.pug');
	
});
app.post('/hello', (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect(`/`);
});

app.listen(PORT, () => {
	console.log(`The server is running on http://${HOST}:${PORT}/`);
});