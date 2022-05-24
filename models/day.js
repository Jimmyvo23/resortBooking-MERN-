
import mongoose from "mongoose";
import {cabinSchema }from "./cabins.js";

const {Schema} = mongoose;

const daySchema = new Schema({
    date: Date,
    cabins: cabinSchema
})
const Day = mongoose.model("Day", daySchema);

export {Day, daySchema}