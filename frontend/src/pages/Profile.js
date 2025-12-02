import HamsterImage from "../assets/Hamster.png";
import { useState, useEffect } from "react";
import APIInterface from "../API_Interface/API_Interface";
import Events from "../components/Events";
import profileEvents from "../components/profileEvents";
import ProfileEvents from "../components/profileEvents";

const API = new APIInterface();

function Profile() {
    const [selectedTab, setSelectedTab] = useState("home");
    const [userGames, setUserGames] = useState([]);

    // read user once
    const [currentUser] = useState(() => {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    });

    useEffect(() => {
        if (!currentUser) return;
        if (selectedTab !== "games") return;

        console.log("currentUser", currentUser);
        console.log("fetching /games/byUser/", currentUser.userId);


        (async () => {
            try {
                const data = await API.getGamesByUser(currentUser.userId);

                const mapped = data.map((g) => ({
                    id: g.game_id,
                    name: g.location,
                    sport: g.sport,
                    address: g.location,
                    time: g.date_time,
                    playercount: g.player_count,
                    size: g.max_players,
                }));

                setUserGames(mapped);
            } catch (err) {
                console.error("Error loading user games:", err);
            }
        })();
    }, [selectedTab, currentUser]);

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <h1 className="text-3xl">Please log in to view your profile.</h1>
            </div>
        );
    }

    const now = new Date();
    const upcomingGames = userGames.filter((g) => new Date(g.time) > now);
    const pastGames = userGames.filter((g) => new Date(g.time) <= now);

    return (
        <div className="profile-container text-white min-h-screen bg-gray-900">
            <div className="container flex">
                <div className="sidebar flex flex-col gap-20 p-4 mb-20 mt-5 border-r border-blue-300 h-screen bg-gray-900 w-60 text-white text-center">
                    <button onClick={() => setSelectedTab("home")} className="hover:text-blue-400">
                        Home
                    </button>
                    <button onClick={() => setSelectedTab("games")} className="hover:text-blue-400">
                        Games
                    </button>
                    <button onClick={() => setSelectedTab("friends")} className="hover:text-blue-400">
                        Friends
                    </button>
                </div>

                <div className="content-container flex-1 p-10 text-white">
                    {selectedTab === "home" && (
                        <section className="profile-container">
                            <div className="mini-nav flex justify-between items-center">
                                <h1 className="text-3xl font-bold">{currentUser.username}</h1>
                            </div>

                            <div className="profile flex flex-col items-center text-center mt-20">
                                <img src={HamsterImage} className="h-70 w-100 rounded-md" />
                                <div className="profile-description">
                                    <p>Hello, I play basketball.</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {selectedTab === "games" && (
                        <div>
                            <h1 className="text-3xl font-bold mb-4">Your Games</h1>

                            <h2 className="text-xl font-semibold mt-6 mb-2">Upcoming Games</h2>
                            {upcomingGames.length ? <ProfileEvents data={upcomingGames} /> : <p>No upcoming games.</p>}

                            <h2 className="text-xl font-semibold mt-10 mb-2">Past Games</h2>
                            {pastGames.length ? <ProfileEvents data={pastGames} /> : <p>No past games.</p>}
                        </div>
                    )}

                    {selectedTab === "friends" && (
                        <div>
                            <h1 className="text-3xl font-bold">Friends</h1>
                            <p>Your friends, connections, stats, etc.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
