import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: ".env" });

const serviceAccount = JSON.parse(fs.readFileSync(new URL("../../serviceAccountKey.json", import.meta.url)));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const database = admin.database();

export { admin, database };
