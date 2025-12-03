// src/pages/Profile.js
import HamsterImage from "../assets/Hamster.png";
import { useEffect, useMemo, useState, useCallback } from "react";
import APIInterface from "../API_Interface/API_Interface";
import ProfileEvents from "../components/profileEvents";
import JoinedEvents from "../components/joinedEvents";

const API = new APIInterface();

function Profile() {
    const [selectedTab, setSelectedTab] = useState("home");

    const [createdGames, setCreatedGames] = useState([]);
    const [joinedGames, setJoinedGames] = useState([]);

    const [loadingCreated, setLoadingCreated] = useState(false);
    const [loadingJoined, setLoadingJoined] = useState(false);

    const currentUser = useMemo(() => {
        const raw = localStorage.getItem("user");
        return raw ? JSON.parse(raw) : null;
    }, []);

    // Same date formatting as Explore
    function formatDate(input) {
        const d = new Date(input);
        const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "long" });
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const time = d.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return `${dayOfWeek} ${month}/${day} @ ${time}`;
    }

    const loadCreatedGames = useCallback(async () => {
        if (!currentUser) return;
        setLoadingCreated(true);
        try {
            const data = await API.getGamesByUser(currentUser.userId);

            const mapped = data.map((g) => {
                const when = new Date(g.date_time);
                return {
                    id: g.game_id,
                    name: g.location,
                    sport: g.sport,
                    address: g.location,
                    time: formatDate(g.date_time), // pretty
                    when, // raw Date for comparisons
                    playercount: Number(g.player_count ?? 0),
                    size: g.max_players,
                };
            });

            setCreatedGames(mapped);
        } catch (err) {
            console.error("Error loading created games:", err);
            setCreatedGames([]);
        } finally {
            setLoadingCreated(false);
        }
    }, [currentUser]);

    const loadJoinedGames = useCallback(async () => {
        if (!currentUser) return;
        setLoadingJoined(true);
        try {
            const data = await API.getGamesParticipating(currentUser.userId);

            const mapped = data.map((g) => {
                const when = new Date(g.date_time);
                return {
                    id: g.game_id,
                    name: g.location,
                    sport: g.sport,
                    address: g.location,
                    time: formatDate(g.date_time),
                    when,
                    playercount: Number(g.player_count ?? 0),
                    size: g.max_players,
                };
            });

            setJoinedGames(mapped);
        } catch (err) {
            console.error("Error loading joined games:", err);
            setJoinedGames([]);
        } finally {
            setLoadingJoined(false);
        }
    }, [currentUser]);

    // Load joined games on mount (Home uses them)
    useEffect(() => {
        if (!currentUser) return;
        loadJoinedGames();
    }, [currentUser, loadJoinedGames]);

    // Load created games when user clicks Games tab
    useEffect(() => {
        if (!currentUser) return;
        if (selectedTab !== "games") return;
        loadCreatedGames();
    }, [selectedTab, currentUser, loadCreatedGames]);

    // Render after hooks (no conditional hook issues)
    if (!currentUser) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <h1 className="text-3xl">Please log in to view your profile.</h1>
            </div>
        );
    }

    const now = new Date();
    const upcomingCreated = createdGames.filter((g) => g.when > now);
    const pastCreated = createdGames.filter((g) => g.when <= now);

    return (
        <div className="min-h-screen bg-gray-900 ">
            <div className="container flex">
                {/* Sidebar */}
                <div className="sidebar flex flex-col gap-20 p-4 mb-20 mt-5 border-r border-blue-300 h-screen bg-gray-900 w-60 text-white text-center">
                    <button onClick={() => setSelectedTab("home")} className="hover:text-blue-400">
                        Home
                    </button>
                    <button onClick={() => setSelectedTab("games")} className="hover:text-blue-400">
                        Games
                    </button>
                </div>

                {/* Content */}
                <div className="content-container flex-1 p-10">
                    {/* HOME TAB */}
                    {selectedTab === "home" && (
                        <section>
                            <div className="mini-nav flex justify-between items-center">
                                <h1 className="text-3xl font-bold text-white">{currentUser.username}</h1>
                            </div>

                            <div className="profile flex flex-col items-center text-center mt-10 text-white ">
                                <img src={HamsterImage} className="h-70 w-100 rounded-md" />
                                <div className="mt-4">
                                    <p>Hello, I play basketball.</p>
                                </div>
                            </div>

                            <div className="joined-games mt-12">
                                <h2 className="text-2xl font-semibold mb-4 text-white">Games You're Playing In</h2>

                                {loadingJoined ? (
                                    <p>Loading…</p>
                                ) : joinedGames.length ? (
                                    // IMPORTANT: force dark text inside white cards so Location/Players/Buttons are visible
                                    <div className="text-gray-900">
                                        <JoinedEvents data={joinedGames} onJoinedGame={loadJoinedGames} />
                                    </div>
                                ) : (
                                    <p>You haven't joined any games yet.</p>
                                )}
                            </div>
                        </section>
                    )}

                    {/* GAMES TAB (created by user) */}
                    {selectedTab === "games" && (
                        <section>
                            <h1 className="text-3xl font-bold mb-4 text-white">Your Created Games</h1>

                            {loadingCreated ? (
                                <p>Loading…</p>
                            ) : (
                                <>
                                    <h2 className="text-xl font-semibold mt-6 mb-2 text-white">Upcoming Games</h2>
                                    {upcomingCreated.length ? (
                                        <div className="text-gray-900">
                                            <ProfileEvents data={upcomingCreated} />
                                        </div>
                                    ) : (
                                        <p>No upcoming games.</p>
                                    )}

                                    <h2 className="text-xl font-semibold mt-10 mb-2 text-white">Past Games</h2>
                                    {pastCreated.length ? (
                                        <div className="text-gray-900 " >
                                            <ProfileEvents data={pastCreated} />
                                        </div>
                                    ) : (
                                        <p >No past games.</p>
                                    )}
                                </>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
