import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../../models/User.js";

const opts = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};

passport.use(
  new LocalStrategy(opts, async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) return done(null, false, { message: 'Not user found.' });
      else if (!await user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
