import Router from "@koa/router";
import gamesRouter from "./games.js";
import authRouter from "./auth.js";   


// Parent router: /api/v1
const router = new Router({
    prefix: "/api/v1",
});

// Test route
router.get("/", (ctx) => {
    ctx.body = "API v1 root working 🚀";
});

// Register child routers
router.use(
    gamesRouter.routes(),
    gamesRouter.allowedMethods()
);

router.use(
    authRouter.routes(),
    authRouter.allowedMethods()
  );

export default router;
