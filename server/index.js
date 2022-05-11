/**
 * Basic example demonstrating passport-steam usage within Express framework
 * This example uses Express's router to separate the steam authentication routes
 */
 const express = require('express')
 , bodyParser = require('body-parser')
 , cors = require('cors')
 , passport = require('passport')
 , util = require('util')
 , session = require('express-session')
 , SteamStrategy = require('../lib/passport-steam').Strategy
 , views = require('./routes/route');




// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
 done(null, user);
});

passport.deserializeUser(function(obj, done) {
 done(null, obj);
});

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
   returnURL: 'http://localhost:3000/auth/steam/return',
   realm: 'http://localhost:3000/',
   apiKey: '11B1AE4F43FFA08D2370A102B0D6CA9E'
 },
 function(identifier, profile, done) {
   // asynchronous verification, for effect...
   process.nextTick(function () {

     // To keep the example simple, the user's Steam profile is returned to
     // represent the logged-in user.  In a typical application, you would want
     // to associate the Steam account with a user record in your database,
     // and return that user instead.
     profile.identifier = identifier;
     return done(null, profile);
   });
 }
));

const app = express();
var path = require('path');

//configure view

app.set('views', __dirname + '/main-content');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(cors());

app.use('/', views)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server started on port ${port}`))

