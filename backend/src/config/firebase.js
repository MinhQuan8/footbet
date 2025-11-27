import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const database = admin.database();

export { admin, database };
