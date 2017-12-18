const express = require('express');
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require('dotenv').config();

const {secret} = require('../config.js').passportAuth0;

const port = 3001;
const app = express();
app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: false
    })
  );

 massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
      app.set('db', dbInstance)
  })
  .catch(console.log);

// require controllers
const userCtrl = require('./controllers/user_controller');

  app.use(json());
  app.use(cors());

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new Auth0Strategy(
      {
        domain,
        clientID,
        clientSecret,
        callbackURL: "/api/login"
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        app
          .get("db")
          .get_user_by_auth_id(profile.id)
          .then(response => {
            if (!response[0]) {
              app
                .get("db")
                .create_user_by_auth_id([profile.id, profile.displayName])
                .then(created => {
                  console.log(created);
                  return done(null, created[0]);
                });
            } else {
              console.log(response)
              return done(null, response[0]);
            }
          });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  app.get(
    "/api/login", function(req, res, next) {
      console.log("redirected")
      next()
    },
    passport.authenticate("auth0", { successRedirect: "/dashboard" })
  );
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })



  app.get("/api/me", function(req, res) {
    if (!req.user) return res.status(404);
      req.app.get('db').get_user_by_auth_id([req.user.authid])
      .then((user) => res.status(200).send(user[0] ))
      .catch(() => res.status(500).send());


  });

  app.get("/api/test", (req, res, next) => {
    req.app
      .get("db")
      .get_users()
      .then(response => {
        res.json(response);
      })
      .catch(console.log);
  });

// user controller
