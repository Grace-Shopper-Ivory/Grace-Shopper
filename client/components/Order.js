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

    let preTaxTotal = 0;
    let taxPrice = preTaxTotal * 0.0875;

    return (
      <div className="user-page">
        <h1>
          Hello {order.firstName} {order.lastName}
        </h1>
        <div className="order">
          <h2>{order.firstName}'s Shopping Cart:</h2>
          {!products.length
            ? ""
            : products.map((product) => {
                const quantity = product.order.amount;
                const price = product.price;
                const subtotal = quantity * price;

                return product.order.inCart ? (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`} className="products">
                      <h2>{product.name}</h2>
                    </Link>
                    <img src={product.img} />
                    <span>{<br />}</span>
                    <a>Quantity: {quantity} </a>
                    <a>Price: $ {price} </a>
                    <a>Subtotal: $ {subtotal.toFixed(2)} </a>
                    <span>{<br />}</span>
                    <button
                      type="button"
                      onClick={() =>
                        this.props.handleCartChange(
                          order.id,
                          product.id,
                          quantity + 1
                        )
                      }
                    >
                      Increase
                    </button>
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() =>
                        this.props.handleCartChange(
                          order.id,
                          product.id,
                          quantity - 1
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
                    <div className="none">
                      {(preTaxTotal += subtotal).toFixed(2)};
                    </div>
                  </div>
                ) : (
                  ""
                );
              })}

          <div className="order-summary">
            <a>Total before tax: ${preTaxTotal.toFixed(2)}</a>
            <span>{<br />}</span>
            <a>Estimated tax: ${(preTaxTotal * 0.0875).toFixed(2)}</a>
            <span>{<br />}</span>
            <a>
              Order Total: ${(preTaxTotal + preTaxTotal * 0.0875).toFixed(2)}
            </a>
          </div>
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
