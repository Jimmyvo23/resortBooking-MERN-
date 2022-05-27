import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import axios from "axios";
import Title from "./Title";

import "react-datepicker/dist/react-datepicker.css";

function BookingCalendar(props) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [startDate, setStartDate] = useState(new Date());

  function getDate(date) {
    setStartDate(date);
  }

  const bookingDate = {
    date: startDate.getDate(),
    month: months[startDate.getMonth()],
    hours: startDate.getHours(),
  };

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  //   const cabinsType = ["CabinA", "CabinB","CabinC","CabinD"]

  const [type, setType] = useState("5inco");

  function handleChangeSelect(e) {
    setType(e.target.value);
  }


  function handleChange(e) {
    const { name, value } = e.target;
    setCustomerInfo((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  const [reservationError, setReservationError] = useState(false);

  function bookingNow(e) {
    e.preventDefault();
    if (
      (customerInfo.fullName.length === 0) |
      (customerInfo.phone.length === 0) |
      (customerInfo.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const payload = {
        bookingDate: {
          date: bookingDate.date,
          months: bookingDate.month,
          time: bookingDate.hours,
        },
        cabin: type,
        fullName: customerInfo.fullName,
        phoneNumber: customerInfo.phone,
        email: customerInfo.email,
      };

      axios
        .post("http://localhost:8080/saved", payload)
        .then((response) => {
          console.log(response);
          console.log(payload)
          console.log("data has been sent to the server");
        })
        .catch((error) => {
          console.log(error);
          console.log("internal error");
        });
      alert(
        "Your Booking is sucessful, We will email you if there is any change!"
      );
    }
  }

  return (
    <div className="booking-section">
      <Title title="Booking Form" />
      <form method="post">
        <div className="input-booking">
          <label htmlFor="cabins">Cabins Type </label>
          <select
            value={type}
            className="calendar-booking"
            onChange={handleChangeSelect}
          >
            <option>Cabin A</option>
            <option>Cabin B</option>
            <option>Cabin C</option>
            <option>Cabin D</option>
          </select>
        </div>
        <br />
        <DatePicker
          className="calendar-booking"
          selected={startDate}
          onChange={getDate}
          showTimeSelect
          includeTimes={[
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 30), 18),
            setHours(setMinutes(new Date(), 30), 19),
            setHours(setMinutes(new Date(), 30), 17),
          ]}
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <div className="input-booking">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="fullName"
            value={customerInfo.fullName}
            id="name"
            placeholder="Enter your Full Name"
          ></input>
        </div>
        <div className="input-booking">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            onChange={handleChange}
            name="phone"
            value={customerInfo.phone}
            placeholder="Enter your phone number"
            id="phone"
          ></input>
        </div>
        <div className="input-booking">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={customerInfo.email}
            placeholder="Enter your email"
            id="email"
          ></input>
        </div>
        <button onClick={bookingNow} className="btn-primary">
          Book now!
        </button>
      </form>
    </div>
  );
}
export default BookingCalendar;
