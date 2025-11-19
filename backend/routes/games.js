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

/* =====================================
   POST /games — create a new game
===================================== */
router.post("/", async (ctx) => {
    try {
        const { sport, location, date_time, max_players, created_by } = ctx.request.body;

        if (!sport || !location || !date_time || !max_players) {
            ctx.status = 400;
            ctx.body = { error: "Missing required fields" };
            return;
        }

        const [result] = await pool.query(
            `INSERT INTO games (sport, location, date_time, max_players, created_by, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
            [sport, location, date_time, max_players, created_by || 1] // TEMP: default user_id=1
        );

        ctx.body = { message: "Game created", game_id: result.insertId };
    } catch (err) {
        console.error("Error creating game:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});


export default router;
