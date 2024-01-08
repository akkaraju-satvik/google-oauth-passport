const passport = require('passport');
const { OAuth2Strategy } = require('passport-google-oauth');
const db = require('../db');

const router = require('express').Router();

const { GOOGLE_OAUTH_CREDENTIALS: {CLIENT_ID, CLIENT_SECRET}, PORT, CLIENT_URL } = require('../config');

passport.use(new OAuth2Strategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: `http://localhost:${PORT}/auth/oauth2/redirect/google`,
  scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);

  db.query('select * from federated_credentials where provider = $1 and subject = $2', ['google', profile.id], (err, res) => {
    if (err) {
      console.log(err);
      return done(err);
    }
    console.log(res.rows);
    if (!res.rows.length) {
      db.query('insert into users (name, email_verified, email) values ($1, $2, $3) returning id', [profile.displayName, profile.emails[0].verified, profile.emails[0].value], (err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        console.log(res.rows);
        const userId = res.rows[0].id;
        db.query('insert into federated_credentials (provider, subject, user_id) values ($1, $2, $3)', ['google', profile.id, userId], (err, res) => {
          if (err) {
            console.log(err);
            return done(err);
          }
          console.log(res.rows);
          return done(null, profile);
        });
      });
    } else {
      return done(null, profile);
    }
  });
}));

passport.serializeUser((user, done) => {
  done(null, { id: user.id, displayName: user.displayName, email: user.emails[0].value });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.get('/login', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: CLIENT_URL + '/auth/success',
  failureRedirect: CLIENT_URL + '/auth/failure'
}));
router.post('/logout', async function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    req.session = null;
    res.clearCookie('connect.sid');
    res.send({
      message: 'Logged out',
      isAuth: req.isAuthenticated()
    })
  });
});


module.exports = router;