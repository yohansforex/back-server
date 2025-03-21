require('dotenv').config(); // Load environment variables

const admin = require('firebase-admin');

// Parse JSON from environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://freshman-module-plus.firebaseio.com"
});

console.log("🔥 Firebase Initialized Successfully!");
