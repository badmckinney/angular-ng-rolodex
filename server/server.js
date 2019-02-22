const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const methodOverride = require('method-override');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

const User = require('../database/models/User');

const api = require('./routes/api');

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET || 'charmander';

if (!PORT) {
  throw new Error('PORT not set');
}

if (!ENV) {
  throw new Error('ENV not set');
}

if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET not set');
}

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  store: new redis({ url: 'redis://redis-server:6379', logErrors: true }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  return done(null, {
    id: user.id
  });
});

passport.deserializeUser((user, done) => {
  new User({ id: user.id }).fetch()
    .then(dbUser => {
      if (dbUser === null) {
        return done();
      }
      dbUser = dbUser.toJSON();
      return done(null, {
        id: dbUser.id,
      });
    })
    .catch((err) => {
      return done(err);
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
  return new User({ username: username }).fetch()
    .then(dbUser => {
      if (dbUser === null) {
        console.log('hit 1');
        return done(null, false);
      }
      else {
        dbUser = dbUser.toJSON();
        bcrypt.compare(password, dbUser.password)
          .then((res) => {
            if (res) {
              console.log('hit 2');
              return done(null, dbUser);
            } else {
              console.log('hit 3');
              return done(null, false);
            }
          });
      }
    })
    .catch(err => {
      console.log('hit 4');
      return done(err);
    });
}));

app.use('/api', api);

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
