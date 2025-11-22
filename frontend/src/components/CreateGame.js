import { useState } from "react";
import APIInterface from "../API_Interface/API_Interface";
import Modal from "./Modal";   // <-- import modal

const API = new APIInterface();

function CreateGame({ onClose }) {
    const [sport, setSport] = useState("");
    const [location, setLocation] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [maxPlayers, setMaxPlayers] = useState(10);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                sport,
                location,
                date_time: dateTime,
                max_players: maxPlayers,
                created_by: 1,
            };

            const response = await API.createGame(data);
            setMessage("Game created successfully! ID: " + response.game_id);

            setSport("");
            setLocation("");
            setDateTime("");
            setMaxPlayers(10);
        } catch (err) {
            console.error("Create game error:", err);
            setMessage("Failed to create game.");
        }
    };

    return (
        <Modal onClose={onClose}>
            <h1 className="text-2xl font-bold mb-4">Create a Game</h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-semibold">Sport</label>
                    <input
                        type="text"
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Basketball, Soccer, etc"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-2 w-full rounded"
                        placeholder="Gym 3, Central Park, etc"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Date & Time</label>
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Max Players</label>
                    <input
                        type="number"
                        value={maxPlayers}
                        onChange={(e) => setMaxPlayers(e.target.value)}
                        className="border p-2 w-full rounded"
                        min="1"
                        max="30"
                    />
                </div>

                <button className="bg-blue-600 text-white w-full py-2 rounded">
                    Create Game
                </button>

                {message && <p className="text-center mt-4">{message}</p>}
            </form>
        </Modal>
    );
}

export default CreateGame;
