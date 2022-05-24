import mongoose from "mongoose";

const {Schema} = mongoose;

const reservationSchema = new Schema({
    name: String,
    phone: String,
    email: String
})

const Reservation = mongoose.model("Reservation", reservationSchema)

export {reservationSchema, Reservation}