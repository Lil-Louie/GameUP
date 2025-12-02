function Header({ onLogin }) {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    function handleLogout() {
        localStorage.removeItem("user");
        window.location.reload(); // refresh UI so header updates
    }

    return (
        <div>
            <nav className="navbar flex justify-between items-center p-4 bg-gray-900 text-white">

                <ul className="nav-list flex flex-row space-x-6">
                    <li><a href="/" className="hover:text-blue-400">Logo</a></li>
                    <li><a href="/Explore" className="hover:text-blue-400">Games</a></li>
                    <li><a href="/Profile" className="hover:text-blue-400">Profile</a></li>
                </ul>

                {/* RIGHT SIDE BUTTONS */}
                <div>
                    {currentUser ? (
                        /* If logged in — show logout + username */
                        <div className="flex items-center space-x-4">

                            <span className="text-blue-400 font-semibold">
                                {currentUser.username}
                            </span>

                            <button
                                onClick={handleLogout}
                                className="text-white py-1 px-4 hover:text-red-400"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        /* If not logged in — show login button */
                        <button
                            onClick={onLogin}
                            className="text-white py-1 px-10 hover:text-blue-400"
                        >
                            Log in
                        </button>
                    )}
                </div>

            </nav>

            <div className="w-full h-px bg-blue-300" />
        </div>
    );
}

export default Header;
