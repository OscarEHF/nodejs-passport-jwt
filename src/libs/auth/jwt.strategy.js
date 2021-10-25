import passport from 'passport';
import passportJwt from 'passport-jwt';

import config from '../../config.js';

const {
  Strategy: JWTStrategy,
  ExtractJwt
} = passportJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET_KEY
}

passport.use(new JWTStrategy(opts, async (payload, done) => done(null, payload)));
