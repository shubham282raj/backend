import express from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import passport from "passport";
import "./strategies/local-strategy.mjs";
import { logging_middleware } from "./utils/middlewares.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  sessions({
    secret: "my secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);
app.use(logging_middleware);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  req.session.visited = true;

  res.cookie("hello", "world", { maxAge: 60000 * 60 });
  res.status(200).send({ msg: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
