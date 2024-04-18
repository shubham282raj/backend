import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  res.send([
    { id: 1, name: "Product 1", price: 1000 },
    { id: 2, name: "Product 2", price: 2000 },
  ]);
});

export default router;