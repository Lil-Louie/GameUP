import Router from "@koa/router";
import pool from "../db.js";
import bcrypt from "bcrypt";

const router = new Router({
    prefix: "/auth"
});

// REGISTER
router.post("/register", async (ctx) => {
    const { username, password, dob } = ctx.request.body;

    if (!username || !password) {
        ctx.status = 400;
        ctx.body = { error: "Username and password required" };
        return;
    }

    const [existing] = await pool.query(
        "SELECT id FROM users WHERE username = ?",
        [username]
    );

    if (existing.length > 0) {
        ctx.status = 400;
        ctx.body = { error: "Username already taken" };
        return;
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
        "INSERT INTO users (username, password, dob) VALUES (?, ?, ?)",
        [username, hashed, dob || null]
    );

    ctx.body = { message: "Account created" };
});

// LOGIN
router.post("/login", async (ctx) => {
    const { username, password } = ctx.request.body;

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
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        ctx.status = 400;
        ctx.body = { error: "Invalid login" };
        return;
    }

    ctx.body = {
        message: "Login successful",
        userId: user.id
    };
});

export default router;
