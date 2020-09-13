const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Routes base middleware
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// DB config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${5000}`));