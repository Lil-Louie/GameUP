import { useState } from "react";
import APIInterface from "../API_Interface/API_Interface";
import Modal from "./Modal";

const API = new APIInterface();

function Login({ onClose, switchToCreate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username,
        password,
      };

      const response = await API.login(data);

      localStorage.setItem("user", JSON.stringify({
          userId: response.userId,
          username: response.username,
          email: response.email
      }));

      // Example: if backend returns a token, you might store it
      // if (remember && response.token) {
      //   localStorage.setItem("authToken", response.token);
      // }

      setMessage("Login successful!");

      // Optionally close modal or reset fields here
      // onClose();
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Failed to log in. Check your username or password.");
    }
  };

  return (
    <Modal onClose={onClose}>
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="uname" className="block font-semibold">
            Username
          </label>
          <input
            type="text"
            id="uname"
            placeholder="Enter Username"
            className="border p-2 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="psw" className="block font-semibold">
            Password
          </label>
          <input
            type="password"
            id="psw"
            placeholder="Enter Password"
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <span>Remember me</span>
        </label>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
        >
          Login
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-2">
            {message}
          </p>
        )}

        {/* Switch to Create Account */}
        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={switchToCreate}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Create one
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default Login;
