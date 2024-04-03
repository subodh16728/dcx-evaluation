const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./DataBase/database");
const userRouter = require("./Routers/userRouter");
const productRouter = require("./Routers/productRouter");
const emailRoutes = require('./Routers/emailRouter');
const offerRouter = require("./Routers/offerRouter");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 4000 || process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    message: "Server is running on the webpage",
  });
});
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/email",emailRoutes);
app.use('/api/offer', offerRouter);


connectDB();

app.listen(PORT, () => {
  console.log("Server is running at port: 4000");
});

module.exports = app;
