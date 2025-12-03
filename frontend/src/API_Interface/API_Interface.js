// frontend/src/API_Interface/API_Interface.js
import axios from "axios";

const axiosAgent = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: false,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default class APIInterface {
  async allGames() {
    const response = await axiosAgent.get("/games");
    return response.data;
  }

  async createGame(gameData) {
    const response = await axiosAgent.post("/games", gameData);
    return response.data;
  }

  async createAccount(accountData) {
    // ⬇️ VERY IMPORTANT: no /api/v1 here, baseURL already has it
    const response = await axiosAgent.post("/auth/register", accountData);
    return response.data;
  }

  async login(credentials) {
    const response = await axiosAgent.post("/auth/login", credentials);
    return response.data;
  }

    async joinGame(gameId, userId) {
        const response = await axiosAgent.post(`/games/${gameId}/join`, {
            user_id: userId
        });
        return response.data;
    }

    async getGamesByUser(userId) {
        const response = await axiosAgent.get(`/games/byUser/${userId}`);
        return response.data;
    }


    // new crisp here 12.1
    async getGamesParticipating(userId) {
        const response = await axiosAgent.get(`/games/participating/${userId}`);
        return response.data;
    }


    async availableGames(userId) {
        const response = await axiosAgent.get(`/games/available/${userId}`);
        return response.data;
    }

    async leaveGame(gameId, userId) {
        const response = await axiosAgent.post(`/games/${gameId}/leave`, {
            user_id: userId,
        });
        return response.data;
    }
    async getAvatar(userId) {
        const response = await axiosAgent.get(`/auth/avatar/${userId}`);
        return response.data; // { avatarUrl }
    }


    async saveAvatar(userId, avatarUrl) {
        const response = await axiosAgent.post("/auth/avatar", {
            userId,
            avatarUrl,
        });
        return response.data;
}


}

