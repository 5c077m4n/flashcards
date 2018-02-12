const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine', 'pug');

const mainRoutes = require('../routes/');
const cardRoutes = require('../routes/cards');
app.use(mainRoutes);
app.use('/cards', cardRoutes);

const [HOST, PORT] = ['127.0.0.1', 3000];

app.use((req, res, next) => {
	const err = new Error('Page not found...');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	res.status(err.status);
	res.render('error');
});

app.listen(PORT, () => {
	console.log(`The server is running on http://${HOST}:${PORT}/`);
});