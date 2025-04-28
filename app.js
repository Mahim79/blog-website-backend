require("dotenv").config()
const express = require("express")
const connectDB = require("./config/database")
const app = express()
const PORT = process.env.PORT




app.listen(PORT,async()=>{
    await connectDB()
    console.log(`server is runing at http://localhost${PORT}`);
    
})