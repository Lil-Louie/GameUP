import Router from "@koa/router";
import gamesRouter from "./games.js";

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

export default router;
