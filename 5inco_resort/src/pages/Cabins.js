import { Component } from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import CabinContainer from "../components/CabinContainer";

export default class Cabin extends Component {
  render() {
    return (
        <div>
      <Hero hero="cabinsHero">
        <Banner title="Our cabins">
          <Link to="/" className="btn-primary">
            Returns Home
          </Link>
        </Banner>
      </Hero>
      <CabinContainer />
      </div>
    );
  }
}
