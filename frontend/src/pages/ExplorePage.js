import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Events from "../components/Events";
import SearchBar from "../components/SearchBar";
import APIInterface from "../API_Interface/API_Interface";

const API = new APIInterface();

function ExplorePage() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // -----------------------------------------
    // Format Date
    // -----------------------------------------
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

    // ---------------------------------------------------
    // Fetch all games (EXTRACTED so it can be called again)
    // ---------------------------------------------------
    const loadEvents = useCallback(async () => {

        const rawUser = localStorage.getItem("user");
        const currentUser = rawUser ? JSON.parse(rawUser) : null;

        try {
            const data = currentUser
                ? await API.availableGames(currentUser.userId)
                : await API.allGames();

            const mapped = data.map((g) => ({
                id: g.game_id,
                name: g.location,
                sport: g.sport,
                address: g.location,
                time: formatDate(g.date_time),
                url: "/assets/field.png",
                playercount: g.player_count,
                size: g.max_players,
            }));

            setEvents(mapped);
            setFilteredEvents(mapped);
        } catch (err) {
            console.error("FAILED TO LOAD GAMES:", err);
            setError("Could not load events.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load
    useEffect(() => {
        loadEvents();
    }, [loadEvents]);

    // ----------------------------------------------------------------
    // SEARCH FEATURE
    // ----------------------------------------------------------------
    const handleSearch = ({ query, sport, status }) => {
        let data = events;

        if (query) {
            data = data.filter((e) =>
                e.name.toLowerCase().includes(query.toLowerCase()) ||
                e.address.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (sport) {
            data = data.filter((e) => e.sport === sport);
        }

        if (status !== "") {
            data = data.filter((e) => String(e.status) === status);
        }

        setFilteredEvents(data);
    };

    // ----------------------------------------------------------------
    // LOADING & ERROR UI
    // ----------------------------------------------------------------
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                Loading events…
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
                {error}
            </div>
        );
    }

    // ----------------------------------------------------------------
    // MAIN PAGE
    // ----------------------------------------------------------------
    return (
        <div className="Explore-Page min-h-screen">

            <div className="p-4 bg-white">
                <SearchBar onSearch={handleSearch} />
            </div>

            <Events data={filteredEvents} onJoinedGame={loadEvents} />
        </div>
    );
}

export default ExplorePage;
