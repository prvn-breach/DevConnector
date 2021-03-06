const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

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

// For production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join('public')));

    app.use((req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
}

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