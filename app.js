const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client/extension");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const assetPath = path.join(__dirname, "public");
app.use(express.static(assetPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    secret: process.env.SESSION_SECRET,
    //saveUninitialized: true is used to store session cookie on session storage
    //even when user is not authenticated or hasn't done anything setting it to false prevents it
    saveUninitialized: false,
    //resave helps to extend expiration date on session, need to set explicitly
    //if session stores don't support the "touch" command
    resave: true,
    name: "storage_app_cookie",
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username.toLowerCase()]
      );

      const user = rows[0];

      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = await bcrypt.compare(password, user.passport);

      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.get("log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up",
    failureMessage: true,
  })
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, "::", () => {
  console.log(`App is live at - http://localhost:${PORT}/`);
});
