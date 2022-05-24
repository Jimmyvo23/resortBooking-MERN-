import mongoose from "mongoose";

const { Schema } = mongoose;

const beachCabinDB = new Schema({
  id: {
    type: Number,
    require: true,
  },
  field: {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    capacity: {
      type: Number,
      require: true,
    },
    pets: {
      type: Boolean,
      require: true,
    },
    beakfast: {
      type: Boolean,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    extras: {
      type: Array,
      require: true,
    },
    images: {
      type: Array,
      require: true,
    },
  },
});

const beachCabin = mongoose.model("beachCabin", beachCabinDB)
export default beachCabin