import { useContext } from "react";
import { CabinContext } from "../Context";
import Title from "./Title";


const getUniqueCabin = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

export default function CabinsFilter({ cabins }) {
  const context = useContext(CabinContext);

  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;
  

  //   Get uniqueCabin

  // console.log(cabin)
  let types = getUniqueCabin(cabins, "type");

  types = ["all", ...types];

  types = types.map((item, index) => {
    return (
      <option className="form-option" value={item} key={index}>
        {item}
      </option>
    );
  });

  let people = getUniqueCabin(cabins, "capacity");

  people = people.map((items, index) => {
    return (
      <option value={items} key={index}>
        {items}
      </option>
    );
  });
  return (
    <div>
      <section className="filter-container">
        <Title title="Search cabins" />
      </section>
      <section className="booking-section">

      </section>
      <form className="filter-form">
        {/* Select Types */}
        <div className="form-group">
          <label htmlFor="type">Cabin type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            {types}
          </select>
          {/* Select by capacity */}
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Guest</label>
          <select
            name="capacity"
            id="capacity"
            onChange={handleChange}
            className="form-control"
            value={capacity}
          >
            {people}
          </select>
        </div>
        {/* Select by price */}
        <div className="form-group">
          <label htmlFor="price">Room Price : ${price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            onChange={handleChange}
            value={price}
          ></input>
        </div>

        {/* Select by room size */}
        <div className="form-group">
          <label htmlFor="size">Room Size</label>
          <div>
            <input
              type="number"
              id="size"
              name="minSize"
              value={minSize}
              onChange={handleChange}
            />
            <input
              type="number"
              id="size"
              name="maxSize"
              value={maxSize}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Select by breakfast */}
        <div className="form-group">
          <input type="checkbox" name="breakfast" checked={breakfast} onChange={handleChange}></input>
          <label htmlFor="breakfast">Breakfast</label>
          <input type="checkbox" name="pets" checked={pets} onChange={handleChange}></input>
          <label htmlFor="pets">Pets</label>
        </div>
        
      </form>
    </div>
  );
}
