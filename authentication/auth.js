const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {authenticate} = require('../services/user-service');

passport.use(new LocalStrategy(async (username, password, done) => {
    const body = {
        username,
        password
    };
    try {
        const userObj = await authenticate(body);
        if (userObj) {
          return done(null, userObj);
        } else {
          return done(null, false);
        }
    } catch(err) {
        return done(err);
    }
}));

console.log('Finished registering local strategy');