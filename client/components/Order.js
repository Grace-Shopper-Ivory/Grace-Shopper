import React from "react";
import { connect } from "react-redux";
import { fetchOrder, editOrder } from "../store/order";
import { Link } from "react-router-dom";

export class Order extends React.Component {
  componentDidMount() {
    this.props.fetchOrderThunk(this.props.id);
  }
  render() {
    let order = this.props.order.order || {};
    let products = order.products || [];

    return (
      <div className="user-page">
        <h1>
          Hello {order.firstName} {order.lastName}
        </h1>
        <div className="order">
          <h2>{order.firstName}'s SHOPPING CART:</h2>
          {!products.length
            ? ""
            : products.map((product) =>
                product.order.inCart ? (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`} className="products">
                      <h2>{product.name}</h2>
                    </Link>

                    <img src={product.img} />
                    <span>{<br />}</span>

                    <a>Quantity: {product.order.amount} </a>
                    <a>Price: $ {product.price}</a>
                    <span>{<br />}</span>

                    <button
                      type="button"
                      onClick={() =>
                        this.props.handleCartChange(
                          order.id,
                          product.id,
                          product.order.amount + 1
                        )
                      }
                    >
                      Increase
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        this.props.handleCartChange(
                          order.id,
                          product.id,
                          product.order.amount - 1
                        )
                      }
                    >
                      Decrease
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  ""
                )
              )}
        </div>
      </div>
    );
  }
}
const mapState = (reduxState) => {
  return {
    order: reduxState.order,
    id: reduxState.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrderThunk: (id) => dispatch(fetchOrder(id)),
    handleCartChange: (orderId, productId, quantity) =>
      dispatch(editOrder(orderId, productId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(Order);
