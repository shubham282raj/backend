// npm i passport passport-local

// for facebook
// npm i passport passport-facebook

import passport from "passport";

// passport integrates very well
// with express-session and cookie-parser

app.use(passport.initialize());
// passport.session() is a middleware that
// will call passport.deserializeUser and you
// should put this between express-session and
// your routes
app.use(passport.session());

// in strategies
import passport from "passport";
import { Strategy } from "passport-local";

// Strategy is a constructor that receives a callback
// 'options' and 'verify' callbacks
// by defualt 'verify' takes username and password
// but in options {usernameField: 'email'} you can
// change the default field to email
passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = mock_users.find((user) => {
        return user.username === username;
      });
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password)
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);

// 'done' function takes error and user

router.post("/api/auth", passport.authenticate("local"));

// for now we are getting some error related
// to serialization
// call the passport serializeUser function before
// defining the strategy then implement
// the deserializeUser function
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializeUser is a function that finds that user and
// attaches it to req object
passport.deserializeUser((id, done) => {
  try {
    const findUser = mock_user.find((user) => {
      user.id === id;
    });
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    { usernameField: "username", passwordField: "password" },
    (username, password, done) => {
      try {
        const findUser = mock_users.find((user) => {
          return user.username === username;
        });
        if (!findUser) throw new Error("User not found");
        if (findUser.password !== password)
          throw new Error("Invalid Credentials");
        done(null, findUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

router.get("/api/auth/status", (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.status(200).send(req.user);
  } else {
    res.status(401).send({ msg: "Not Authenticated" });
  }
});

router.post("/api/auth/logout", (req, res) => {
  if (!req.user) {
    res.status(401).send({ msg: "Not Authenticated" });
  } else {
    req.logout((err) => {
      if (err) {
        return res.sendStatus(400);
      }
      res.status(200).send({ msg: "Logged Out" });
    });
  }
});
// when you logout the cookie is still there is the 
// client browser, you should also remove the cookieq
// even if you don't, the server has called 'logout'
// hence, even if the browser sends the cookie the server
// will not authenticate the user