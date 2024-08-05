require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const Transaction = require("./models/Transaction.js");
const mongoose = require("mongoose");


const corsOptions = {
  origin:[process.env.FRONTEND_URL], // Replace with your actual frontend URL
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  methods: 'GET,POST,PUT,DELETE', // Specify allowed methods as needed
   credentials: true, // If your frontend needs to send cookies or credentials with the request
   allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
};

app.use(cors(corsOptions));

app.use(express.json());

 mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000,
    poolSize: 10,
    family: 4,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);


app.get("/", (req, res) => {
  res.json("hello");
});


app.post("/transaction", async (req, res) => {
  const { name, description, datetime, price } = req.body;
  console.log(name);
  
  try {
    const data = await Transaction.create({
      name,
      description,
      price,
      datetime,
    });
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the transaction',
      error: error.message,
    });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const data = await Transaction.find();
    res.status(200).json({
      success: true,
      message: 'Transactions retrieved successfully',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving the transactions',
      error: error.message,
    });
  }
})

console.log(process.env.PORT);
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});
