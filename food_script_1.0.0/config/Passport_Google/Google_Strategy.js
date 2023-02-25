var googleCredential = require('./G_Client_ky.json')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


function Google_Strategy(passport){

passport.use(new GoogleStrategy({
    clientID: googleCredential.web.client_id,
    clientSecret: googleCredential.web.client_secret,
    callbackURL:googleCredential.web.redirect_uris[0]
  },
  function(accessToken, refreshToken ,profile, done) {
    // pool.query('INSERT INTO user_section.user_data VALUES ( $1, $2 )', [ profile.email, '' ])
    User.findOne({ 'google.id' : profile.id }, function(err, user) {
      if (user)
          return done(()=>{console.log(user)})})

    //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      //  });
  }
));}

module.exports = Google_Strategy;