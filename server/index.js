const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const app = express();

require("dotenv").config();

const port = 3001;

// require controllers
const userCtrl = require("./controllers/user_controller");
const airportCtrl = require("./controllers/airport_controller");

// middleware
app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(process.env.CONNECTIONSTRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(console.log);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
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
              .create_user_by_auth_id([
                profile.id,
                profile.displayName,
                profile.email,
                profile.picture
              ])
              .then(created => {
                return done(null, created[0]);
              });

          } else {
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
  "/api/login",
  passport.authenticate("auth0", { successRedirect: "http://localhost:3000/" })
);
app.get("/api/logout", function(req, res) {
  req.logout();
  res.redirect("http://localhost:3000/");
});

app.get("/api/me", function(req, res) {

  if (!req.user) return res.status(404).send();

  req.app
    .get("db")
    .get_user_by_auth_id(req.user.auth_id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err));
});
//`````````````````````````````````Endpoints`````````````````````````````````````
const flightCtrl = require("./controllers/flights_controller");
app.post("/api/getFlights", flightCtrl.Get_Flights);
app.get("/api/getWatchlist/:id", userCtrl.Get_Watchlist);
app.get("/api/getImages/:id", flightCtrl.Get_Images);

app.post("/api/getQuote",flightCtrl.Get_Quote);
app.post("/api/addTrip",flightCtrl.Add_Trip);

app.put("/api/deleteTrip",flightCtrl.Delete_Trip);
app.delete("/api/trip/:id",flightCtrl.Delete_Trip);

app.get("/api/getAirport",airportCtrl.Get_Airport);

app.get("/api/test", (req, res, next) => {
  req.app
    .get("db")
    .get_users()
    .then(response => {
      res.json(response);
    })
    .catch(console.log);
});

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
