import Modal from "./Modal";

function Login({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <h1 className="text-2xl font-bold mb-4">
        Login
      </h1>

      <div className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="uname" className="block font-semibold">
            Username
          </label>
          <input
            type="text"
            id="uname"
            placeholder="Enter Username"
            name="uname"
            required
            className="border p-2 w-full rounded"
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
            name="psw"
            required
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2">
          <input type="checkbox" name="remember" defaultChecked />
          <span>Remember me</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-4"
        >
          Login
        </button>
      </div>
    </Modal>
  );
}

export default Login;
