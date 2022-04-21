import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { Link } from "react-router-dom";

export class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      this.props.fetchSingleProductThunk(this.props.match.params.productId);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const singleProduct = this.props.singleProduct;
    return (
      <div className="singleProduct">
        <Link to="/products"> Back To All Products</Link>
        <h2>{singleProduct.name}</h2>
        <h3> $ {singleProduct.price}</h3>
        <p>
          <b>About this item: </b>
          <span>{<br />}</span>
          {singleProduct.description}
        </p>
        <img src={singleProduct.img} />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProductThunk: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
