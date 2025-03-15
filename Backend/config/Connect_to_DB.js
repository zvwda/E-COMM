const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect("mongodb+srv://zwalid3271:2zHRNU8VWuiVip52@cluster0.ycvng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("connected to DB");
    } catch (error) {
         console.log("connection faild to MongoDB" , error);
    }
}