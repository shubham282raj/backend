import { Router } from "express";

const router = Router();

// then except for using app.get, app.post, etc
// we can use router.get, router.post, etc

router.get(path, ...handlers)

// then we can export this router and use 
// it in our main file

export default router;

// .....................................
// in the main file with the app = express()
// we can use the router like this

import user_router from "file_path";
// you can change the name router to user_router
// for ease of understanding

app.use(user_router);
// this will intergrate the user_router with the app

// -------------------------------------
// we can even make a middleware for the router
// make a index file for the routers

import { Router } from "express";
import user_routers from "./users.mjs";
import product_routers from "./products.mjs";

const router = Router();

router.use(user_routers)
router.use(product_routers)

export default router;

// then in the main file
import router from "file_path";
app.use(router);

// this will intergrate all the routers 
// with the app with just one call