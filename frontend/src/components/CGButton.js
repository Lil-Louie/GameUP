import CreateGame from "./CreateGame";
import { useState } from "react";

export default function CGButton() {
    const [openCreate, setOpenCreate] = useState(false);

    return (
        <div>
            <button
                onClick={() => setOpenCreate(true)}
                className="px-4 py-2 bg-green-500 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
            >
                New Game
            </button>

            {openCreate && (
                <CreateGame onClose={() => setOpenCreate(false)} />
            )}
        </div>
    );
}
