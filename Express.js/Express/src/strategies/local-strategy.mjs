import passport from "passport";
import { Strategy } from "passport-local";
import { mock_users } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User ${user}`)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Inside Deserialize User ${id}`)
  try {
    const findUser = mock_users.find((user) => {
      return user.id === id;
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
