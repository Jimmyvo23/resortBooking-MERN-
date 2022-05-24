import React, { Component } from "react";

const CabinContext = React.createContext();

class CabinProvider extends Component {
  state = {
    cabins: [],
    sortedCabins: [],
    featuredCabins: [],
    loading: true,

    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  // GetData

  getData = async () => {
    await fetch("http://localhost:8080/api", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        let cabins = data;
        let featuredCabins = cabins.filter((cabin) => cabin.featured === true);
        //
        let maxPrice = Math.max(...cabins.map((item) => item.price));
        let minPrice = Math.min(...cabins.map((item) => item.price));
        let maxSize = Math.max(...cabins.map(item => item.size))

        this.setState({
          cabins,
          featuredCabins,
          sortedCabins: cabins,
          loading: false,
          price: maxPrice,
          maxPrice,
          minPrice,
          maxSize
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   Render Component
  componentDidMount() {
    this.getData();
  }
  // Function get Cabin for single Cabin

  getCabin = (slug) => {
    let tempCabin = [...this.state.cabins];
    const cabin = tempCabin.find((cabin) => cabin.slug === slug);
    return cabin;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterCabins
    );
  };

  filterCabins = () => {
    let {
      cabins,
      type,
      capacity,
      price,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;
    // All the cabins
    let tempCabin = [...cabins];

    // Transform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by Type
    if (type !== "all") {
      tempCabin = tempCabin.filter((cabin) => cabin.type === type);
    }
    // Filter by capacity
    if (capacity !== 1) {
      tempCabin = tempCabin.filter((cabin) => cabin.capacity >= capacity);
    }
    // Filter by price
    tempCabin = tempCabin.filter((cabin) => cabin.price <= price);

    // Filer by Size
    tempCabin = tempCabin.filter(cabin => cabin.size >= minSize && cabin.size <= maxSize)

    // Filter by breakfast
    if (breakfast) {
      tempCabin = tempCabin.filter(cabin => cabin.breakfast === true)
    }
    // Filter by pets
    if (pets){
      tempCabin=tempCabin.filter(cabin => cabin.pets === true)
    }
    // Change state

    this.setState({ sortedCabins: tempCabin });
  };

  render() {
    return (
      <CabinContext.Provider
        value={{
          ...this.state,
          getCabin: this.getCabin,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </CabinContext.Provider>
    );
  }
}

export function withCabinConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <CabinConsumer>
        {(value) => <Component {...props} context={value} />}
      </CabinConsumer>
    );
  };
}

const CabinConsumer = CabinContext.Consumer;

export { CabinProvider, CabinConsumer, CabinContext };
