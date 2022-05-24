import { Link } from "react-router-dom";
import defaultImg from "../images/defaultBcg.jpeg";
import PropTypes from "prop-types";

export default function Cabin({ cabin }) {
  const { name, slug, images, price } = cabin;
 

  return (
    <article className="cabin">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single cabin " />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/cabins/${slug}`} className="btn-primary cabin-link">
          Features
        </Link>
      </div>
      <p className="cabin-info">{name}</p>
    </article>
  );
}
Cabin.propTypes = {
  cabin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
