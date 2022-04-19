import React from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/products";
import { Link } from "react-router-dom";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProductsThunk();
  }

  render() {
    let productsArr = this.props.products || [];

    return (
      <div className="productsList">
        {!productsArr.length
          ? ""
          : productsArr.map((products) => (
              <div key={products.id}>
                <Link to={`/products/${products.id}`} className="products">
                  <h2>{products.name}</h2>
                </Link>
                {/* <button
                  type="button"
                  className="deleteStudentButton"
                  onClick={() => this.props.deleteStudentThunk(student.id)}
                >
                  X
                </button> */}
                <img src={products.img} />
              </div>
            ))}
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    products: reduxState.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProductsThunk: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
