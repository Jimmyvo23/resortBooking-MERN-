import React, { useState, useEffect } from "react";

function Booking() {
  const [totalCabins, setTotalCabins] = useState([]);

  // USer's selections
  const [selection, setSelection] = useState({
    cabin: {
      name: null,
      id: null,
    },
    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0,
  });

  // User's Booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // List of potential location
  const [locations] = useState(["Any Location", "Patio", "Inside", "Bar"]);
  const [times] = useState([
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ]);

//   Basic reservation "validation"
const [reservationError, setReservationError] = useState(false);

function getDate(){
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
      "December"
    ];
    const date = 
    months[selection.date.getMonth()] + " " + selection.date.getDate() + " " + selection.date.getFullYear();

    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
}

function getEmptyCabins(){
    let cabins = totalCabins.filter(cabin => cabin.isAvailable);
    return cabins.length;
}

useEffect(() => {
    // Check availability of tables from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async _ => {
        let datetime = getDate();
        let res = await fetch("http://localhost:8080/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            date: datetime
          })
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let cabins = res.cabins.filter(
          cabin =>
            (selection.size > 0 ? cabin.capacity >= selection.size : true) &&
            (selection.location !== "Any Location"
              ? cabin.location === selection.location
              : true)
        );
        setTotalCabins(cabins);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  // Make the reservation if all details are filled out
  const reserve = async _ => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {
      const datetime = getDate();
      let res = await fetch("http://localhost:8080/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          cabin: selection.cabin.id
        })
      });
      res = await res.text();
      console.log("Reserved: " + res);
    }
  };

  // Clicking on a table sets the selection state
  const selectCabins = (cabin_name, cabin_id) => {
    setSelection({
      ...selection,
      table: {
        name: cabin_name,
        id: cabin_id
      }
    });
  };

  // Generate party size dropdown
  const getSizes = _ => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <select
          key={i}
          className="booking-dropdown-item"
          onClick={e => {
            let newSel = {
              ...selection,
              cabin: {
                ...selection.cabin
              },
              size: i
            };
            setSelection(newSel);
          }}
        >
          <option>{i}</option>
          </select>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = _ => {
    let newLocations = [];
    locations.forEach(loc => {
      newLocations.push(
        <select
          key={loc}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              cabin: {
                ...selection.cabin
              },
              location: loc
            };
            setSelection(newSel);
          }}
        >
          <option>{loc}</option>
        </select>
      );
    });
    return newLocations;
  };

  // Generate locations dropdown
  const getTimes = _ => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <select
          key={time}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              cabin: {
                ...selection.cabin
              },
              time: time
            };
            setSelection(newSel);
          }}
        >
          <option>{time}</option>
        </select>
      );
    });
    return newTimes;
  };

  // Generating tables from available tables state
  const getCabins = _ => {
    console.log("Getting tables");
    if (getEmptyCabins() > 0) {
      let cabins = [];
      totalCabins.forEach(cabin => {
        if (cabin.isAvailable) {
          cabins.push(
            <table
              key={cabin._id}
              id={cabin._id}
              chairs={cabin.capacity}
              name={cabin.name}
              empty
              selectTable={selectCabins}
            />
          );
        } else {
          cabins.push(
            <table
              key={cabin._id}
              id={cabin._id}
              chairs={cabin.capacity}
              name={cabin.name}
              selectTable={selectCabins}
            />
          );
        }
      });
      return cabins;
    }
  };

  return <div>
  <div noGutters className="text-center align-items-center pizza-cta">
    <div>
      <p className="looking-for-pizza">
        {!selection.cabin.id ? "Book a Table" : "Confirm Reservation"}
        <i
          className={
            !selection.cabin.id
              ? "fas fa-chair pizza-slice"
              : "fas fa-clipboard-check pizza-slice"
          }
        ></i>
      </p>
      <p className="selected-table">
        {selection.cabin.id
          ? "You are booking table " + selection.cabin.name
          : null}
      </p>

      {reservationError ? (
        <p className="reservation-error">
          * Please fill out all of the details.
        </p>
      ) : null}
    </div>
  </div>

  {!selection.cabin.id ? (
    <div id="reservation-stuff">
      <div noGutters className="text-center align-items-center">
        <div xs="12" sm="3">
          <input
            type="date"
            required="required"
            className="booking-dropdown"
            value={selection.date.toISOString().split("T")[0]}
            onChange={e => {
              if (!isNaN(new Date(new Date(e.target.value)))) {
                let newSel = {
                  ...selection,
                  table: {
                    ...selection.table
                  },
                  date: new Date(e.target.value)
                };
                setSelection(newSel);
              } else {
                console.log("Invalid date");
                let newSel = {
                  ...selection,
                  table: {
                    ...selection.table
                  },
                  date: new Date()
                };
                setSelection(newSel);
              }
            }}
          ></input>
        </div>
        <div xs="12" sm="3">
          <div>
            <div>
              {selection.time === null ? "Select a Time" : selection.time}
            </div>
            <div right className="booking-dropdown-menu">
              {getTimes()}
            </div>
          </div>
        </div>
        <div xs="12" sm="3">
          <div>
            <div color="none" caret className="booking-dropdown">
              {selection.location}
            </div>
            <div>
              {getLocations()}
            </div>
          </div>
        </div>
        <div xs="12" sm="3">
          <div>
            <div>
              {selection.size === 0
                ? "Select a Party Size"
                : selection.size.toString()}
            </div>
            <div>
              {getSizes()}
            </div>
          </div>
        </div>
      </div>
      <div noGutters className="tables-display">
        <div>
          {getEmptyCabins() > 0 ? (
            <p className="available-tables">{getEmptyCabins()} available</p>
          ) : null}

          {selection.date && selection.time ? (
            getEmptyCabins() > 0 ? (
              <div>
                <div className="table-key">
                  <span className="empty-table"></span> &nbsp; Available
                  &nbsp;&nbsp;
                  <span className="full-table"></span> &nbsp; Unavailable
                  &nbsp;&nbsp;
                </div>
                <div noGutters>{getCabins()}</div>
              </div>
            ) : (
              <p className="table-display-message">No Available Tables</p>
            )
          ) : (
            <p className="table-display-message">
              Please select a date and time for your reservation.
            </p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div id="confirm-reservation-stuff">
      <div
        noGutters
        className="text-center justify-content-center reservation-details-container"
      >
        <div xs="12" sm="3" className="reservation-details">
          <input
            type="text"
            bsSize="lg"
            placeholder="Name"
            className="reservation-input"
            value={booking.name}
            onChange={e => {
              setBooking({
                ...booking,
                name: e.target.value
              });
            }}
          />
        </div>
        <div xs="12" sm="3" className="reservation-details">
          <input
            type="text"
            bsSize="lg"
            placeholder="Phone Number"
            className="reservation-input"
            value={booking.phone}
            onChange={e => {
              setBooking({
                ...booking,
                phone: e.target.value
              });
            }}
          />
        </div>
        <div>
          <input
            type="text"
            bsSize="lg"
            placeholder="Email"
            className="reservation-input"
            value={booking.email}
            onChange={e => {
              setBooking({
                ...booking,
                email: e.target.value
              });
            }}
          />
        </div>
      </div>
      <div noGutters className="text-center">
        <div>
          <button
            color="none"
            className="book-table-btn"
            onClick={_ => {
              reserve();
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )}
</div>
}
export default Booking;
