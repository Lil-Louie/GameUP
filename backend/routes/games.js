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
            WHERE g.date_time > NOW()
            GROUP BY g.game_id
            HAVING COUNT(p.participant_id) < g.max_players
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
    let conn;
    try {
        const { sport, location, date_time, max_players, created_by } = ctx.request.body;


        if (!sport || !location || !date_time || !max_players || !created_by) {
            ctx.status = 400;
            ctx.body = { error: "Missing required fields" };
            return;
        }


        conn = await pool.getConnection();
        await conn.beginTransaction();


        const [result] = await conn.query(
            `INSERT INTO games (sport, location, date_time, max_players, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())`,
            [sport, location, date_time, max_players, created_by]
        );


        const gameId = result.insertId;



        await conn.query(
            `INSERT INTO participants (user_id, game_id, joined_at)
            VALUES (?, ?, NOW())`,
            [created_by, gameId]
        );


        await conn.commit();


        ctx.body = { message: "Game created", game_id: gameId };
    } catch (err) {
        if (conn) await conn.rollback();
        console.error("Error creating game:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    } finally {
        if (conn) conn.release();
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

/* =====================================
   GET /games/participating/:id — games user joined but didn't create
===================================== */
router.get("/participating/:id", async (ctx) => {
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
                COUNT(p2.participant_id) AS player_count
            FROM participants p
            JOIN games g ON p.game_id = g.game_id
            LEFT JOIN participants p2 ON g.game_id = p2.game_id
            WHERE p.user_id = ?
              AND g.created_by <> ?
            GROUP BY g.game_id
            ORDER BY g.date_time ASC
            `,
            [userId, userId]
        );

        ctx.body = rows;
    } catch (err) {
        console.error("Error fetching participating games:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});





// GET /games/available/:userId  (games the user can still join)
router.get("/available/:userId", async (ctx) => {
    try {
        const userId = ctx.params.userId;

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
      LEFT JOIN participants p ON p.game_id = g.game_id
      WHERE g.date_time > NOW()
        AND g.game_id NOT IN (
          SELECT game_id FROM participants WHERE user_id = ?
        )
      GROUP BY g.game_id
      HAVING player_count < g.max_players
      ORDER BY g.date_time ASC
    `, [userId]);

        ctx.body = rows;
    } catch (err) {
        console.error("Error fetching available games:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});

/* =====================================
   set join a game
===================================== */

router.post("/:id/join", async (ctx) => {
    try {
        const { user_id } = ctx.request.body;
        const gameId = ctx.params.id;

        if (!user_id) {
            ctx.status = 400;
            ctx.body = { error: "User ID required" };
            return;
        }

        // already joined?
        const [existing] = await pool.query(
            `SELECT participant_id FROM participants WHERE user_id=? AND game_id=?`,
            [user_id, gameId]
        );

        if (existing.length > 0) {
            ctx.status = 400;
            ctx.body = { error: "Already joined" };
            return;
        }

        // capacity check
        const [rows] = await pool.query(
            `
      SELECT 
        g.max_players,
        COUNT(p.participant_id) AS player_count
      FROM games g
      LEFT JOIN participants p ON g.game_id = p.game_id
      WHERE g.game_id = ?
      GROUP BY g.game_id
      `,
            [gameId]
        );

        if (rows.length === 0) {
            ctx.status = 404;
            ctx.body = { error: "Game not found" };
            return;
        }

        const { max_players, player_count } = rows[0];

        if (Number(player_count) >= Number(max_players)) {
            ctx.status = 400;
            ctx.body = { error: "Game is full" };
            return;
        }

        await pool.query(
            `INSERT INTO participants (user_id, game_id, joined_at) VALUES (?, ?, NOW())`,
            [user_id, gameId]
        );

        ctx.body = { message: "Joined game successfully" };
    } catch (err) {
        console.error("Join game error:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});

// Leave a game
router.post("/:id/leave", async (ctx) => {
    try {
        const gameId = ctx.params.id;
        const { user_id } = ctx.request.body;

        if (!user_id) {
            ctx.status = 400;
            ctx.body = { error: "User ID required" };
            return;
        }

        const [result] = await pool.query(
            `DELETE FROM participants WHERE user_id = ? AND game_id = ?`,
            [user_id, gameId]
        );

        if (result.affectedRows === 0) {
            ctx.status = 400;
            ctx.body = { error: "You are not in this game" };
            return;
        }

        ctx.body = { message: "Left game successfully" };
    } catch (err) {
        console.error("Leave game error:", err);
        ctx.status = 500;
        ctx.body = { error: "Database error" };
    }
});


export default router;



