require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
const cors = require("cors");

//Import routes
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

//use CORS
app.use(cors());

//parse Json data
app.use(express.json());

//logged out the path and method of each request
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Attach Routes to the app
app.use("/posts/", postRoutes);
app.use("/comments", commentRoutes);

//Mongo username, password, database
const mongoUsername = process.env.MONGODB_USERNAME;
const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoDatabase = process.env.MONGO_DATABASE;

//Mongo url
const mongoURL = `mongodb+srv://${mongoUsername}:${mongoPassword}@webapp.naaahny.mongodb.net/?retryWrites=true&w=majority&appName=${mongoDatabase}`

app.get("/", (req, res) => {
    res.send("Hello, this is your Express server");
});
  
app.listen(port, () => {
    console.log(`Express sever is running on http://localhost:${port}`);
});

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
