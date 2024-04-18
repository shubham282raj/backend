import express from "express";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import { logging_middleware } from "./utils/middlewares.mjs";
import { mock_users } from "./utils/constants.mjs";

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
app.use(router);
app.use(logging_middleware);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  req.session.visited = true;

  res.cookie("hello", "world", { maxAge: 60000 * 60 });
  res.status(200).send({ msg: "Hello World" });
});

app.post("/api/auth", (req, res) => {
  const {
    body: { name, password },
  } = req;

  const findUser = mock_users.find((user) => user.name === name);

  if (!findUser && findUser !== password) {
    return res.status(401).send({ msg: "Bad Credentials" });
  }

  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    console.log(sessionData);
  });

  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({
        msg: "Not Authenticated",
      });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  cart ? cart.push(item) : (req.session.cart = [item]);
  return res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  return res.send(req.session.cart ?? []);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
