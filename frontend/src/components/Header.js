function Header({onLogin}) {
    return (
        <div>
            {/*This is a the navbar container, uses flex to organize the items*/}
            <nav className="navbar flex justify-between items-center space-between p-4 bg-gray-900 text-white">
                {/*This is a list of links*/}
                <ul className="nav-list flex flex-row space-x-6">
                    <li><a href="/" className="hover:text-blue-400">Logo</a></li>
                    <li><a href="/Explore" className="hover:text-blue-400">Games</a></li>
                    <li><a href="#Profile" className="hover:text-blue-400">Profile</a></li>
                </ul>

                <button
                    onClick={onLogin}
                    className="text-white py-1 px-10 hover:text-blue-400"
                >
                    Log in
                </button>

            </nav>
        </div>
    );
}
export default Header;