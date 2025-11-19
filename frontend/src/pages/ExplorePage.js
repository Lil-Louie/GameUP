import { useState, useEffect } from "react";
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

    // ==========================================================
    // FETCH REAL GAMES FROM BACKEND
    // ==========================================================
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const data = await API.allGames(); // <-- using your interface

                console.log("Fetched Games:", data);

                // Map DB fields → Events component format
                const mapped = data.map((g) => ({
                    id: g.game_id,
                    name: g.location,
                    sport: g.sport,
                    address: g.location,
                    time: new Date(g.date_time).toLocaleString(),
                    url: "https://unsplash.com/photos/white-and-black-soccer-ball-on-grass-field-dKCKiC0BQtU", // until you add images
                    players_id: [], // placeholder until players table
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
        };

        loadEvents();
    }, []);

    // ==========================================================
    // SEARCH FEATURE (still works)
    // ==========================================================
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

    // ==========================================================
    // LOADING / ERROR UI
    // ==========================================================
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

    // ==========================================================
    // MAIN PAGE
    // ==========================================================
    return (
        <div className="Explore-Page min-h-screen">
            <Header />

            <h1 className="text-3xl font-bold mb-4 text-center">Explore</h1>

            <div className="p-4 bg-gray-200">
                <SearchBar onSearch={handleSearch} />
            </div>

            <Events data={filteredEvents} />
        </div>
    );
}

export default ExplorePage;
