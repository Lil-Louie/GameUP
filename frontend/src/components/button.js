import APIInterface from "../API_Interface/API_Interface";

const API = new APIInterface();

function Button({gameId, onJoined}) {

    async function joinEvent(){
        const currentUser = JSON.parse(localStorage.getItem("user"));

        if (!currentUser) {
            alert("You must be logged in to join a game.");
            return;
        }

        try {
            const res = await API.joinGame(gameId, currentUser.userId);
            alert("Successfully joined the game!");

            if(onJoined) onJoined();

        } catch (err) {
            console.error("Join game error:", err);
            alert("Failed to join game.");
        }

        }
    


    return (
        <button className=" border m-5 px-16 py-1 bg-green-500 "
                onClick={ joinEvent }
        >
            Join Game 
        </button>
    
        );
    }
    
export default Button;