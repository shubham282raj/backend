import express from "express";
import router from "./routes/index.mjs";
import cookieParser  from 'cookie-parser'
import { logging_middleware } from "./utils/middlewares.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.use(logging_middleware);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 60000 * 60 });
  res.status(200).send({ msg: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
