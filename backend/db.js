const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }); 
    console.log("Connected Successfully");

    const fetched_data = await mongoose.connection.db.collection("foodData");
    const data = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.categ_items = catData;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = mongoDB;
