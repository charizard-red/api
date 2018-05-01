const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const Users = require('../models/Users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.serializeUser((id, done) => {
  Users.findById(id).then((data) => {
    done(null, user.id)
  })
})

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: '381700836276-o5n6k3g4udv0i164pfbgr4dcn3rpbm7j.apps.googleusercontent.com',
    clientSecret: 'daFfDbRVVZquhm3zaN8DgPRh'
  }, (accessToken, refreshToken, profile, done) => {
    Users.findOne({ google_id: profile.id }).then((current) => {
      if(current) {
        console.log('user is '+current);
        done(null, current)
      } else {
        new Users({
          username: profile.displayName,
          google_id: profile.id
        }).save().then((data) => {
          done(null, data)
        })
      }
    })
  })
)
