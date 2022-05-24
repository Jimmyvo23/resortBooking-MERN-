import { Component } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import Services from "./Services";
import FeaturedCabin from "../components/FeaturedCabin";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Hero>
          <Banner title="Luxury Beach Cabin" subtitle="Our Cabin starting at $100">
            <Link to="/cabins" className="btn-primary">
              Our cabin
            </Link>
          </Banner>
        </Hero>
        <Services />
        <FeaturedCabin />
      </div>
    );
  }
}
