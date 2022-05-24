import mongoose from "mongoose";
import {reservationSchema} from "./reservation.js";


 const {Schema} = mongoose;

 const cabinSchema = new Schema({
     name: String,
     capacity: Number,
     isAvailable: Boolean,
     lacation: String,
     reservation: {
         required: false,
         type: reservationSchema
     }
 })

 const Cabin = mongoose.model("Cabin", cabinSchema)

 export {Cabin, cabinSchema}