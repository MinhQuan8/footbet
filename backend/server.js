import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/app.js";

dotenv.config({ path: ".env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
