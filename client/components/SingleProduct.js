import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  componentDidMount() {
    try {
      this.props.fetchSingleProductThunk(this.props.match.params.productId);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    console.log(this.props);

    return (
      <div className="singleProduct">
        <h2>single</h2>
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
