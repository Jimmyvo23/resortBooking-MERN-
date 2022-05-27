import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingListDB = new Schema({
  cabin: String,
  fname: String,
  phone: String,
  email: String,
  date: Number,
  month: Number,
  hour: Number,
  minute: Number,
  year: Number,
});

const bookingList = mongoose.model("bookingList", bookingListDB);

export default bookingList;
