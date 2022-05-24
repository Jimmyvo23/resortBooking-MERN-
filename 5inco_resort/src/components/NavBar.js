import { Component } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight} from "react-icons/fa";
import logo from "../images/5inco.svg";

export default class NavBar extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
      console.log("Click");
    this.setState({ isOpen: !this.state.isOpen });
 console.log(this.state)
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link className="nav-logo" to="/">
              <img src={logo} />
              
            </Link>
            <button
                onClick={this.handleToggle}
                type="button"
                className="nav-btn"
              >
                <FaAlignRight className="nav-icon" />
              </button>
          </div>

          <ul className={ this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cabins">Cabins</Link>
            </li>
            <li>
              <Link to="/services">Serives</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
