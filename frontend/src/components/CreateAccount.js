// frontend/src/components/CreateAccount.jsx
import { useState } from "react";
import APIInterface from "../API_Interface/API_Interface";
import Modal from "./Modal";

const API = new APIInterface();

function CreateAccount({ onClose, switchToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [message, setMessage]   = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const data = { username, email, password };

      const response = await API.createAccount(data);
      // response.message === "Account created"
      setMessage(response.message || "Account created!");

      // optional: clear or switch to login
      // switchToLogin();
    } catch (err) {
      const errMsg = err?.response?.data?.error || "Failed to create account.";
      setMessage(errMsg);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <form onSubmit={handleCreateAccount} className="space-y-4">
        <div>
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded mt-4"
        >
          Create Account
        </button>

        {message && (
          <p className="text-center text-sm mt-2">
            {message}
          </p>
        )}

        <p className="text-center text-sm mt-2">
          Already have an account?{" "}
          <button
            type="button"
            onClick={switchToLogin}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Log in
          </button>
        </p>
      </form>
    </Modal>
  );
}

export default CreateAccount;
