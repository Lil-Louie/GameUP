import Modal from "./Modal";

function CreateAccount({ onClose, switchToLogin }) {
  return (
    <Modal onClose={onClose}>
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <div className="space-y-4">
        {/* Username */}
        <div>
          <label htmlFor="uname" className="block font-semibold">Username</label>
          <input
            type="text"
            id="uname"
            placeholder="Choose a Username"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="psw" className="block font-semibold">Password</label>
          <input
            type="password"
            id="psw"
            placeholder="Create Password"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm" className="block font-semibold">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            placeholder="Confirm Password"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Create Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded mt-4"
        >
          Create Account
        </button>

        {/* Switch back to Login */}
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
      </div>
    </Modal>
  );
}

export default CreateAccount;
