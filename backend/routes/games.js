import Router from "@koa/router";
import pool from "../db.js";

const router = new Router({
    prefix: '/games'
});

router.get("/", async (ctx) => {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM games
            ORDER BY date_time ASC
        `);

        ctx.body = rows;
    } catch (err) {
        console.error("Error fetching games:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});

export default router;
