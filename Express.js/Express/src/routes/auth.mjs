import { Router } from "express";
// import { mock_users } from "../utils/constants.mjs";
import passport from "passport";

const router = Router();

// router.post("/api/auth", (req, res) => {
//   const {
//     body: { name, password },
//   } = req;

//   const findUser = mock_users.find((user) => user.name === name);

//   if (!findUser && findUser !== password) {
//     return res.status(401).send({ msg: "Bad Credentials" });
//   }

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// router.get("/api/auth/status", (req, res) => {
//   req.sessionStore.get(req.session.id, (err, sessionData) => {
//     console.log(sessionData);
//   });

//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({
//         msg: "Not Authenticated",
//       });
// });

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

export default router;
