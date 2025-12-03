// src/components/unjoin_button.js
import APIInterface from "../API_Interface/API_Interface";

const API = new APIInterface();

function LeaveButton({ gameId, onLeft }) {
    const handleLeave = async () => {
        const rawUser = localStorage.getItem("user");
        const currentUser = rawUser ? JSON.parse(rawUser) : null;

        if (!currentUser) {
            alert("You must be logged in to leave a game.");
            return;
        }

        try {
            await API.leaveGame(gameId, currentUser.userId);
            alert("You left the game.");

            // refresh parent list (Profile can pass a reload function)
            if (onLeft) onLeft();
        } catch (err) {
            console.error("Leave game error:", err);
            alert(err?.response?.data?.error || "Failed to leave game.");
        }
    };

    return (
        <button
            type="button"
            onClick={handleLeave}
            className="
        !inline-flex !items-center !justify-center
        !px-6 !py-2
        !rounded-lg
        !bg-red-600 !text-white
        !border !border-red-700
        hover:!bg-red-700
        font-semibold
        shadow
      "
        >
            Leave Game
        </button>
    );
}

export default LeaveButton;
