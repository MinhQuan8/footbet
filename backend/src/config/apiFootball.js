import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: ".env" });

const apiFootball = axios.create({
    baseURL: "https://v3.football.api-sports.io",
    headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY
    }
});

export { apiFootball };
