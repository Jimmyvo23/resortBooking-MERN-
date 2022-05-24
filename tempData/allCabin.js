import mongoose from "mongoose";
import {Cabin} from "../models/cabins.js";
import cabins from "./tempData.js";

// let cabinData = JSON.stringify(cabins);

let allCabin = [];
 let data = cabins.forEach(cabin => {
    allCabin.push(new Cabin(cabin));
})

export default allCabin