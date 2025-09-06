const dotenv = require("dotenv");
dotenv.config({ quiet: true });

const cron = require('node-cron');
const axios = require('axios');
const express = require("express");
const path = require('path');
const cors = require("cors");

const { connectDB } = require('./database/dbConnection');
const userRouter = require("./routes/route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API routes
app.use("/api", userRouter);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Self-ping to keep server alive
cron.schedule('*/14 * * * *', async () => {
  try {
    const res = await axios.get('https://mern-todo-axios.onrender.com/health');
    console.log(`Self-ping success: ${res.status}`);
  } catch (err) {
    console.error('Self-ping failed:', err.message);
  }
});

const PORT = process.env.PORT || 3000;

// Start server and connect to MongoDB once
app.listen(PORT, async () => {
  try {
    await connectDB(); // Cached connection logic inside connectDB
    console.log(`Server Running on PORT ${PORT}`);
  } catch (err) {
    console.error('Failed to start server due to DB error:', err.message);
    process.exit(1);
  }
});
