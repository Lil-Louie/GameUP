function Header() {
    return (
        <div>
            <nav className="navbar flex justify-between items-center p-4 bg-gray-900 text-white">
                <ul className="nav-list flex flex-row space-x-6">
                    <li><a href="/" className="hover:text-blue-400">Logo</a></li>
                    <li><a href="/Explore" className="hover:text-blue-400">Games</a></li>
                    <li><a href="#Profile" className="hover:text-blue-400">Profile</a></li>
                    <li><a href="/create-game" className="hover:text-blue-400">Create Game</a></li>
                </ul>
            </nav>
        </div>
    );
}
export default Header;