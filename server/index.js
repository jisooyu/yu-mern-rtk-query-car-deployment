const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');

const passport = require('passport');
const config = require('./config/keys');
const mongoConfig = config.mongo;
const cookieConfig = config.cookie;

require('dotenv').config();
require('./models/Users');
require('./models/Cars');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(mongoConfig.mongoURI);

const app = express();
// Enable CORS for all routes
app.use(cors());

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [cookieConfig.cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

// require('./routes/authRoutes')(app);
app.use('/', authRoutes);
// require('./routes/carRoutes')(app);
app.use('/', carRoutes);

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
} else if ((process.NOVE_ENV = 'development')) {
	console.log('Running in development mode');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
