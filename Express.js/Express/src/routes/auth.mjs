import { Router } from "express";
import { mock_users } from "../utils/constants.mjs";

const router = Router();

router.post("/api/auth", (req, res) => {
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

router.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    console.log(sessionData);
  });

  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({
        msg: "Not Authenticated",
      });
});

export default router;
