import { Router } from "express";
import user_routers from "./users.mjs";
import product_routers from "./products.mjs";

const router = Router();

router.use(user_routers)
router.use(product_routers)

export default router;