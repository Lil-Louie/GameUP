import Router from "@koa/router";
import pool from "../db.js";

const router = new Router({
    prefix: '/games'
});

/* =====================================
   GET /games — pull all the games and the players
===================================== */
router.get("/", async (ctx) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                g.game_id,
                g.sport,
                g.location,
                g.date_time,
                g.max_players,
                g.created_by,
                g.created_at,
                COUNT(p.participant_id) AS player_count
            FROM games g
                     LEFT JOIN participants p ON g.game_id = p.game_id
            where g.date_time > NOW()
            GROUP BY g.game_id
            ORDER BY g.date_time ASC;

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


// =====================================
// GET /games/byUser/:id — games created by user
// =====================================
router.get("/byUser/:id", async (ctx) => {
    try {
        const userId = ctx.params.id;

        const [rows] = await pool.query(
            `
            SELECT 
                g.game_id,
                g.sport,
                g.location,
                g.date_time,
                g.max_players,
                g.created_by,
                g.created_at,
                COUNT(p.participant_id) AS player_count
            FROM games g
            LEFT JOIN participants p ON g.game_id = p.game_id
            WHERE g.created_by = ?
            GROUP BY g.game_id
            ORDER BY g.date_time ASC
            `,
            [userId]
        );

        ctx.body = rows;
    } catch (err) {
        console.error("Error fetching user games:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});



export default router;


router.post("/:id/join", async (ctx) => {
    try {
        const { user_id } = ctx.request.body;
        const gameId = ctx.params.id;

        // Check if user already joined
        const [existing] = await pool.query(
            `SELECT participant_id FROM participants WHERE user_id=? AND game_id=?`,
            [user_id, gameId]
        );

        if (existing.length > 0) {
            ctx.status = 400;
            ctx.body = { error: "Already joined" };
            return;
        }

        await pool.query(
            `INSERT INTO participants (user_id, game_id, joined_at) VALUES (?, ?, NOW())`,
            [user_id, gameId]
        );

        ctx.body = { message: "Joined game successfully" };

    } catch (err) {
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});

