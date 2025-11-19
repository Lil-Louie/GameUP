import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";

import rootRouter from "./routes/gameUp_routes.js";

const app = new Koa();

app.use(cors());
app.use(bodyParser());

// Register all sub-routers here
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

const PORT = 4000;
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);
