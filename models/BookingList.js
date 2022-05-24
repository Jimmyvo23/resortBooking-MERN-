import mongoose from "mongoose";

const {Schema} = mongoose;

const bookingListDB = new Schema({
cabinType: {
    type: String,
    require: true,
},
bookingDate: {
    type: Object,
    require: true,
},
fullName: {
    type: String,
    require: true,
},
phoneNumber: {
    type: String,
    require: true,
},
email: {
    type: String,
    require: true
}
})

const bookingList = mongoose.model("bookingList", bookingListDB);

export default bookingList