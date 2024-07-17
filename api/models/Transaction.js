const mongoose = require("mongoose");
const {model,Schema}=require("mongoose");
const TransactionSchema= new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  datetime: {
    type: String    ,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TransacationModel=model("TransactionSchema",TransactionSchema);
module.exports=TransacationModel;