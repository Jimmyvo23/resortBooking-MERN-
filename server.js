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

// Availability Rouute

// app.post("/availability", (req, res, next) => {
//   console.log("request attempted");

//   console.log(req.body);
//   const dateTime = new Date(req.body.date);

//   Day.find({ date: dateTime }, (err, docs) => {
//     if (!err) {
//       if (docs.length > 0) {
//         // Record already exists
//         console.log("Record exists. Sent docs.");
//         res.status(200).send(docs[0]);
//       } else {
//         // Search date does not exists and we need to create it
//         const day = new Day({
//           date: dateTime,
//           cabins: allCabin,
//         });
//         day.save((err) => {
//           if (err) {
//             res.status(400).send("error saving new Date");
//           } else {
//             // Saved date and need to return all cabin (because all are now available)
//             console.log("Create new datetime. Here are the default docs");
//             Day.find({ date: dateTime }, (err, docs) => {
//               err ? res.sendStatus(400) : res.status(200).send(docs[0]);
//             });
//           }
//         });
//       }
//     } else {
//       res.status(400).send("Cound not search for date");
//     }
//   });
// });

// // Reservation Route
// app.post("/reservation", function(req, res, next) {
//   Day.find({ date: req.body.date }, (err, days) => {
//     if (!err) {
//       if (days.length > 0) {
//         let day = days[0];
//         day.cabins.forEach(cabin => {
//           if (cabin._id == req.body.table) {
//             // The correct table is table
//             cabin.reservation = new Reservation({
//               name: req.body.name,
//               phone: req.body.phone,
//               email: req.body.email
//             });
//             cabin.isAvailable = false;
//             day.save(err => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 console.log("Reserved");
//                 res.status(200).send("Added Reservation");
//               }
//             });
//           }
//         });
//       } else {
//         console.log("Day not found");
//       }
//     }
//   });
// });

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log("Server has started on port" + PORT);
});
