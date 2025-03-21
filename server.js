const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Add this console log to check if the server starts
console.log('Starting the server...');

const serviceAccount = require('./your-firebase-key.json'); // Replace with the correct filename
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// API to handle reports
app.post('/report', async (req, res) => {
  const { reason, content } = req.body;

  try {
    await db.collection('reports').add({
      reason,
      content,
      timestamp: new Date(),
    });

    res.status(200).json({ success: true, message: 'Report submitted successfully!' });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ success: false, message: 'Failed to submit report.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
