import { Component } from "react";
import Title from "../components/Title";
import { MdKayaking } from "react-icons/md";
import { GiBoatFishing, GiCampingTent } from "react-icons/gi";
import { BiRestaurant } from "react-icons/bi";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <MdKayaking />,
        title: "Kayaking",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        icon: <GiBoatFishing />,
        title: "Boat Fishing",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        icon: <GiCampingTent />,
        title: "Day Camping",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        icon: <BiRestaurant />,
        title: "Amazing food",
        info: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ],
  };
  render() {
    return (
      <div>
        <section className="services">
          <Title title="Services" />
          <div></div>
          <div className="services-center">
            {this.state.services.map((item, index) => {
              return (
                <article key={index} className="services" >
                  <span>{item.icon}</span>
                  <h6>{item.title}</h6>
                  <p>{item.info}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}
