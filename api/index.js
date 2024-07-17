const express = require("express");
const app = express();
const cors = require("cors");
const Transacation = require("./models/Transaction.js");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json("hello");
});

app.post("/api/transaction", async (req, res) => {
  const { name, description, datetime,price } = req.body;
  console.log(name);
  try {
   await  mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB successfully");
    });
    const data = await Transacation.create({
      name,
      description,
      price,
      datetime,
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
   await  mongoose.connect(process.env.MONGO_URI);
      const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB successfully");
    });
    const data =await Transacation.find();
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("server woriking");
});
