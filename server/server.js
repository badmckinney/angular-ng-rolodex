const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const redis = require('connect-redis')(session);
const methodOverride = require('method-override');

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

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(session({
  store: new redis({ url: 'redis://redis-server:6379', logErrors: true }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static('public'));

app.use('/api', api);

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
