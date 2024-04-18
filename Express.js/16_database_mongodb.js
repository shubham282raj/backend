// install mongoDB

// npm install mongoose
// mongoose is node module for mongodb

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/express")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// defining schema in a dfiferent file
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: {
    type: mongoose.Schema.Types.String,
  },
  password: {
    type: mongoose.Schema.Types.String,
    password: true,
  },
});

export const User = mongoose.model("User", userSchema);

// create new user
router.post(
  "/api/users",
  checkSchema(create_user_val_schema),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send(result.array());
    }

    const data = matchedData(req);

    try {
      const newUser = new User(data);
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
);

// local stratergy on mongoDB
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const findUser = await User.findOne({ username: username });
        if (!findUser) throw new Error("User not found");
        if (findUser.password !== password) throw new Error("Invalid Password");
        done(null, findUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);