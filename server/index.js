const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const db = require('./db');

const { PORT, SESSION_SECRET, CLIENT_URL } = require('./config');
const passport = require('passport');

const app = express();

app.use(morgan('dev'));
app.use(cors({
  credentials: true,
  origin: CLIENT_URL
}));
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  store: new pgSession({
    pool: db,
    tableName: 'user_sessions',
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message
    });
  }
  next();
});

app.get('/', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
  console.log(req.sessionID);
  return res.json({
    message: 'Hello World',
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});

app.use('/auth', require('./routes/auth'));

app.all('*', (req, res) => {
  return res.status(404).json({
    message: 'Not Found'
  });
});

app.listen(PORT, () => {
  console.info('Server listening on port', PORT);
});