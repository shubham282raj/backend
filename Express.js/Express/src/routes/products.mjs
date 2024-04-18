import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log("1", req.cookies);
  console.log("2", req.headers.cookie);

  if (req.cookies.hello && req.cookies.hello === "world") {
    res.send([
      { id: 1, name: "Product 1", price: 1000 },
      { id: 2, name: "Product 2", price: 2000 },
    ]);
  } else {
    res.status(401).send({ msg: "Sorry you need the cookie" });
  }
});

export default router;