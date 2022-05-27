import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import beachCabin from "./models/beachCabin.js";
const app = express();
import bookingList from "./models/BookingList.js";
import { Day } from "./models/day.js";
import allCabin from "./tempData/allCabin.js";

app.use(cors());

const PORT = process.env.PORT || 8080;

const URLmongodb =
  "mongodb+srv://beachresort:YhzavelMetrillo@cluster0.ctw54.mongodb.net/beachCabin?retryWrites=true&w=majority";
mongoose.connect(URLmongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());

// Get Api from mongodb for frontEnd of the App
app.get("/api", (req, res) => {
  beachCabin.find({}).then((data) => {
    res.json(data);
  });
});
// Get and Post api for booking
app.get("/saved", (req, res)=> {
    bookingList. find({})
    .then((data)=> {
        console.log("Data:", data)
        res.json(data)
    })
    .catch((error)=> {
        console.log(error)
    })
})

app.post("/saved", (req, res)=> {
    const data = req.body;
    console.log(res.body)
    const newBookingList = new bookingList(data);

    newBookingList.save((error)=> {
        if (!error) {
            return res.json({
                msg: "your data has been saved!!!"
            });
        } else {
            res.status(500).json({msg: "Sorry, internal server error"})
        }
    })
})

/

app.get("/", (req, res) => {
  res.send("Hello world, Welcome to my server!");
});

app.listen(PORT, () => {
  console.log("Server has started on port" + PORT);
});
