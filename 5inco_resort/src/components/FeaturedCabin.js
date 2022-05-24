import { Component } from "react";
import { CabinContext } from "../Context";
import Title from "./Title";
import Loading from "./Loading";
import Cabin from "./Cabin";

export default class FeaturedCabin extends Component {
  static contextType = CabinContext;
  render() {
     
const {loading, featuredCabins: cabins} = this.context;

// Loop and get all the featured room for home Pages
const cabinWithFeatured = cabins.map(cabin => {
    return <Cabin key={cabin.id} cabin={cabin} />
})
    return (
        <section className="featured-cabins">
            <Title title="Featured Cabins" />
            <div className="featured-cabins-center">
                {loading ? <Loading /> : cabinWithFeatured}
            </div>
        </section>
    )
  }
}
