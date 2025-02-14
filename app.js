const express = require("express");
const app = express();
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");
const indexRouter = require("./routes/indexRouter");
require("dotenv").config();

const prisma = new PrismaClient();

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
      const user = await prisma.users.findUnique({
        where: {
          // Or username: username
          username,
        },
      });

      if (!user) return done(null, false, { message: "Incorrect username" });

      const match = String(password) === String(user.password);

      if (!match) return done(null, false, { message: "Incorrect password" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// The reason passport require us to define these functions is so
// that we can make sure that whatever bit of data it’s looking
// for actually exists in our Database
passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        //Or id: id
        id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(async (req, res, next) => {
  const isAuthenticated = await req.isAuthenticated();

  console.log("isAuthenticated", isAuthenticated);

  next();
});

app.use("/", indexRouter);

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
