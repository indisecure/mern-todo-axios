const dotenv = require("dotenv");
dotenv.config({"quiet":true}); 
const cron = require('node-cron');
const axios = require('axios');
const express = require("express");

const app = express(); 
const path= require('path')

const userRouter = require("./routes/route");

app.use(express.json())

app.use(express.static(path.join(__dirname,'dist')))

const cors = require("cors");

app.use(cors())  
const { connectDB } = require('./database/dbConnection') 

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use("/api", userRouter);

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist','index.html'))
})

cron.schedule('*/10 * * * *', async () => {
  try {
    const res = await axios.get('https://mern-todo-axios.onrender.com//health');//need render URL 
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


