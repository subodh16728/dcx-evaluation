const mongoose = require('mongoose')
 
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB")
 
    }
    catch (err) {
        console.log("Error mongoose", err)
    }
}

module.exports = connectDB