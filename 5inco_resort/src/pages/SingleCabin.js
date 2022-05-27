import { Component } from "react";
import defaultBcg from "../images/details-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { CabinContext } from "../Context";
import StyledHero from "../components/StyleHero";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import axios from "axios";
import Title from "../components/Title";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

export default class SingleCabin extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
      selectedDate: new Date(),
      excludedTime: [],
      fname: "",
      phone: "",
      email: "",
      reservationError: false,
      bookingList: [],
      bookedDate: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedDate = this.handleSelectedDate.bind(this);
    this.booking = this.booking.bind(this);
  }

  // Get Data from bookingList Collection

  getBookingList() {
    axios
      .get("http://localhost:8080/saved")
      .then((response) => {
        const data = response.data;

        this.setState({
          bookingList: data,
          bookedDate: data
            .filter((item) => item.cabin === this.state.slug)
            .map(
              (item) => new Date(item.year, item.month, item.date, item.hour),
              0
            ),
        });
      })
      .catch((err) => console.log(err));
  }

  // Change input value
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Change Date and Time
  handleSelectedDate = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  // Get excluded time on specific date

  getExcludedTimes = (date) => {
    let arrSpecificDates = [];
    for (let i = 0; i < this.state.bookedDate.length; i++) {
      if (
        moment(date, moment.ISO_8601).format("YYYY/MM/DD") ===
        moment(this.state.bookedDate[i], moment.ISO_8601).format("YYYY/MM/DD")
      ) {
        arrSpecificDates.push(
          moment(this.state.bookedDate[i], moment.ISO_8601).toObject()
        );
      }
    }

    let arrExcludedTimes = [];
    for (let i = 0; i < arrSpecificDates.length; i++) {
      arrExcludedTimes.push(
        setHours(
          setMinutes(new Date(), arrSpecificDates[i].minutes),
          arrSpecificDates[i].hours
        )
      );
      this.setState({
        excludedTimes: arrExcludedTimes,
      });
    }
  };

  booking(event) {
    event.preventDefault();
    if (
      (this.state.fname.length === 0) |
      (this.state.phone.length === 0) |
      (this.state.email.length === 0)
    ) {
      console.log("Incompleted Detail??");
      this.setState({
        reservationError: true,
      });
    } else {
      const payload = {
        cabin: this.state.slug,
        fname: this.state.fname,
        phone: this.state.phone,
        email: this.state.email,
        date: this.state.selectedDate.getDate(),
        month: this.state.selectedDate.getMonth(),
        hour: this.state.selectedDate.getHours(),
        minutes: this.state.selectedDate.getMinutes(),
        year: this.state.selectedDate.getFullYear(),
      };
      axios
        .post("http://localhost:8080/saved", payload)
        .then((response) => {
          console.log(response);
          console.log(payload);
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

  refreshPage() {
    window.location.reload(false);
  }

  static contextType = CabinContext;

  componentDidMount() {
    this.getBookingList();
  }
  render() {
    const { getCabin } = this.context;
    const cabin = getCabin(this.state.slug);


    if (!cabin) {
      return (
        <div className="error">
          <h3>no such Cabin could be found</h3>
          <Link to="/cabins" className="btn-primary">
            go back to room
          </Link>
        </div>
      );
    }

    // Destructure the Cabin props
    const {
      description,
      breakfast,
      capacity,
      name,
      pets,
      price,
      size,
      images,
      extras,
    } = cabin;

    const [mainImg, ...restOftheImg] = images;

    // Post API for booking Form
    const { selectedDate, excludedTimes } = this.state;

    return (
      <div>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={name}>
            <Link to={"/cabins"} className="btn-primary">
              back to Cabins
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-cabin">
          <div className="single-cabin-img">
            {restOftheImg.map((img, index) => {
              return <img key={index} src={img} alt="room-images" />;
            })}
          </div>
          <div className="pop-up">
            <Popup 
              contentStyle={{ width: "50%" }}
              trigger={<button className="glow-on-hover">Book Now!!</button>}
              position="top center"
            >
              <div className="booking-section">
                <Title title="Booking Form" />
                <form onSubmit={this.booking} method="post">
                  <label htmlFor="date">Select Date and Time</label>

                  <DatePicker
                    selected={selectedDate}
                    onChange={this.handleSelectedDate}
                    onSelect={this.getExcludedTimes}
                    popperPlacement="top-start"
                    dateFormat="dd/MM/yyy"
                    minDate={new Date()}
                  />
                  <DatePicker
                    selected={selectedDate}
                    excludeTimes={excludedTimes}
                    onChange={this.handleSelectedDate}
                    onSelect={this.getExcludedTimes}
                    popperPlacement="top-start"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeFormat="HH:mm"
                    dateFormat="hh:mm aa"
                    minDate={new Date()}
                  />
                  <div className="input-booking">
                    <label htmlFor="fname">Full Name</label>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name="fname"
                      value={this.state.fname}
                      id="fname"
                      placeholder="Enter your Full Name"
                    ></input>
                  </div>
                  <div className="input-booking">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      onChange={this.handleChange}
                      name="phone"
                      value={this.state.phone}
                      placeholder="Enter your phone number"
                      id="phone"
                    ></input>
                  </div>
                  <div className="input-booking">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      onChange={this.handleChange}
                      name="email"
                      value={this.state.email}
                      placeholder="Enter your email"
                      id="email"
                    ></input>
                  </div>
                  <button onClick={this.refreshPage} className="btn-primary">Confirm your booking!</button>
                </form>
              </div>
            </Popup>
          </div>
          <div className="single-cabin-info">
            <article className="desc">
              <h3>Details</h3>
              <p>{description}</p>
            </article>

            <article className="info">
              <h3>info</h3>
              <p>{`Price: ${price}`}</p>
              <h6>{`Size: ${size} SQFT`}</h6>
              <h6>
                Max capacity :{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? "Pets allowed" : "No pets allowed"}</h6>
              <h6>{breakfast && "Free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="cabin-extras">
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </section>
      </div>
    );
  }
}
