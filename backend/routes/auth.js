import Router from "@koa/router";
import pool from "../db.js";
import bcrypt from "bcrypt";


const router = new Router({
    prefix: "/auth",
});


// REGISTER: expects { username, email, password }
router.post("/register", async (ctx) => {
    try {
        const { username, email, password } = ctx.request.body;


        if (!username || !email || !password) {
            ctx.status = 400;
            ctx.body = { error: "Username, email, and password are required" };
            return;
        }


        // Check if username or email already exist
        const [existing] = await pool.query(
            "SELECT user_id FROM users WHERE username = ? OR email = ?",
            [username, email]
        );


        if (existing.length > 0) {
            ctx.status = 400;
            ctx.body = { error: "Username or email already in use" };
            return;
        }


        const hashed = await bcrypt.hash(password, 10);


        await pool.query(
            "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
            [username, email, hashed]
        );


        ctx.body = { message: "Account created" };
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        ctx.status = 500;
        ctx.body = { error: "Internal server error" };
    }
});


// LOGIN: login by username (could also add email support later)
router.post("/login", async (ctx) => {
    try {
        const { username, password } = ctx.request.body;


        if (!username || !password) {
            ctx.status = 400;
            ctx.body = { error: "Username and password are required" };
            return;
        }


        const [rows] = await pool.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );


        if (rows.length === 0) {
            ctx.status = 400;
            ctx.body = { error: "Invalid login" };
            return;
        }


        const user = rows[0];


        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            ctx.status = 400;
            ctx.body = { error: "Invalid login" };
            return;
        }


        ctx.body = {
            message: "Login successful",
            userId: user.user_id,
            username: user.username,
            email: user.email,
        };
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        ctx.status = 500;
        ctx.body = { error: "Internal server error" };
    }
});


// GET /auth/avatar/:id — get avatar URL for a user
router.get("/avatar/:id", async (ctx) => {
    try {
        const userId = ctx.params.id;


        const [rows] = await pool.query(
            "SELECT avatar_url FROM user_profiles WHERE user_id = ?",
            [userId]
        );


        ctx.body = {
            avatarUrl: rows.length ? rows[0].avatar_url : null,
        };
    } catch (err) {
        console.error("GET AVATAR ERROR:", err);
        ctx.status = 500;
        ctx.body = { error: "Internal server error" };
    }
});


// POST /auth/avatar — set avatar URL for a user
// expects { userId, avatarUrl }
router.post("/avatar", async (ctx) => {
    try {
        const { userId, avatarUrl } = ctx.request.body;


        if (!userId || !avatarUrl) {
            ctx.status = 400;
            ctx.body = { error: "userId and avatarUrl are required" };
            return;
        }


        await pool.query(
            `
     INSERT INTO user_profiles (user_id, avatar_url)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE avatar_url = VALUES(avatar_url)
     `,
            [userId, avatarUrl]
        );


        ctx.body = { message: "Avatar updated" };
    } catch (err) {
        console.error("SET AVATAR ERROR:", err);
        ctx.status = 500;
        ctx.body = { error: "Internal server error" };
    }
});




export default router;