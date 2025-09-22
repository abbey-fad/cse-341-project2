const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const Github = require('passport-github2').Strategy;


const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin,X-Requested-With, Content-Type,Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*'}))
  .use('/', require('./routes'/indexedDB.js));

  process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\nException origin: ${origin}`);
  });

  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
    function (accessToken, refreshToken, profile, done) {
      //User.findOnCreate({ githubId: profile.id}, function (err, user){
      return done(null, profile);
      //});
  }
  ))

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port, () => console.log(`Database is listening and node Running on port ${port}`));
  }
});
