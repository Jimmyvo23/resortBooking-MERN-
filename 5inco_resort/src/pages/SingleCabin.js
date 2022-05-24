import { Component } from "react";
import defaultBcg from "../images/details-1.jpeg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { CabinContext } from "../Context";
import StyledHero from "../components/StyleHero";
import BookingCalendar from "../components/Calendar"
import Booking from "../components/Booking";

import "react-datepicker/dist/react-datepicker.css";



export default class SingleCabin extends Component {

  
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg,
      startDate: null
    };
  }

  static contextType = CabinContext;
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
            <div>
           
            

            </div>
          </div>
        </section>
        <section className="cabin-extras">
          <ul className="extras">
            {extras.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </section>
        <BookingCalendar />
        {/* <Booking /> */}
      </div>
    );
  }
}
