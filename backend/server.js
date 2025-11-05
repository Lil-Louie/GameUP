import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.get("/", (ctx) => {
  ctx.body = { message: "Koa backend running ✅" };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
