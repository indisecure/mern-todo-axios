const env = require("dotenv");
env.config(); 
const cron = require('node-cron');
const axios = require('axios');
const express = require("express");

const app = express(); 
const path= require('path')

const userRouter = require("./routes/route");

app.use(express.json())// to enable app to send JSON data/to be used after app creation

const cors = require("cors");

app.use(cors({
  origin: "https://mern-todo-axios-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
const { connectDB } = require('./database/dbConnection') 

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use("/api", userRouter);

cron.schedule('*/10 * * * *', async () => {
  try {
    const res = await axios.get('https://mern-todo-axios.onrender.com/health');
    console.log(`Self-ping success: ${res.status}`);
  } catch (err) {
    console.error('Self-ping failed:', err.message);
  }
});
 
const PORT = process.env.PORT || 5000; 

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
});


