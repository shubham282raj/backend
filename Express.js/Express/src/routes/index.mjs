import { Router } from "express";
import user_routers from "./users.mjs";
import product_routers from "./products.mjs";
import cart_routers from "./cart.mjs"
import auth_routers from "./auth.mjs"

const router = Router();

router.use(user_routers)
router.use(product_routers)
router.use(cart_routers)
router.use(auth_routers)

export default router;