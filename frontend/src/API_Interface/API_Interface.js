import axios from "axios";

const axiosAgent = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    withCredentials: false,   // no auth yet
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
});

export default class APIInterface {

    async allGames() {
        try {
            const response = await axiosAgent.get("/games");
            return response.data;
        } catch (err) {
            console.error("API ERROR (allGames):", err);
            throw err;
        }
    }

    async createGame(gameData) {
        try {
            const response = await axiosAgent.post("/games", gameData);
            return response.data;
        } catch (err) {
            console.error("API ERROR (createGame):", err);
            throw err;
        }
    }

}
