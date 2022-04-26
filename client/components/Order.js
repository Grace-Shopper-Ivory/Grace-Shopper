import React from "react";
import { connect } from "react-redux";
import { fetchOrder, editOrder, deleteOrder, setOrder } from "../store/order";
import { checkout } from "../store/order";
import { Link } from "react-router-dom";
import { deleteFromGuestCart, editGuestCart } from "../store";

export class Order extends React.Component {
  constructor(){
    super()
    this.state={
      loggedIn:false,
      confirmOrder: false
    }
    //this.changeAmount=this.changeAmount.bind(this)
  }
  componentDidUpdate() {
    !this.props.confirmOrder;
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.fetchOrderThunk(this.props.id);
      this.setState({ loggedIn: true });
    }
  }
  componentWillUnmount() {
    this.props.resetOrder()
  }

  changeAmount(orderId, itemId, itemAmount) {
    if (this.state.loggedIn) {
      this.props.handleCartChange(orderId, itemId, itemAmount);
    } else {
      this.props.editGuestCart(itemId, itemAmount);
    }
  }

  render() {
    let order = this.props.order || {};
    let products = order.products || [];

    if(!this.state.loggedIn){
      order = {
        firstName: "Guest",
        lastName: "",
      }
        (products = this.props.guestCart);
    }

    let preTaxTotal = 0;

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
                const quantity = this.state.loggedIn
                  ? product.order.amount
                  : product.amount;
                const price = product.price;
                const subtotal = quantity * price;
                const inCart = this.state.loggedIn ? product.order.inCart : true
                const productId = this.state.loggedIn ? product.id : product.productId
                const orderId = this.state.loggedIn ? order.id : ""

                return inCart ? (
                  <div key={productId}>
                    <Link to={`/products/${product.id}`} className="products">
                      <h2>{product.name}</h2>
                    </Link>
                    <img src={product.img} />
                    <span>{<br />}</span>
                    <a>Quantity: {quantity} </a>
                    <a>Price: $ {price} </a>
                    <a>Subtotal: $ {subtotal.toFixed(2)} </a>
                    <span>{<br />}</span>
                    <input
                      defaultValue={quantity}
                      type="number"
                      min="1"
                      max="100"
                      size="2"
                      onChange={(event) => {
                        this.changeAmount(
                          orderId,
                          productId,
                          Number(event.target.value)
                        );
                      }}
                    ></input>
                    <button
                      type="button"
                      onClick={() => this.state.loggedIn ? this.props.handleRemoveFromCart(product.id, this.props.id) : this.props.deleteFromGuestCart(productId)}
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
        <div className="checkout">
          <button onClick={this.props.confirmOrder ? 'Thank you for your order!' : () => this.props.checkout(order.id)}>Checkout</button>
        </div>
      </div>
    );
  }
}
const mapState = (reduxState) => {
  return {
    order: reduxState.order,
    id: reduxState.auth.id,
    guestCart: reduxState.guestCart,
  };
};

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchOrderThunk: (id) => dispatch(fetchOrder(id)),
    handleCartChange: (orderId, productId, quantity) =>
      dispatch(editOrder(orderId, productId, quantity)),
    deleteFromGuestCart: (productId)=>dispatch(deleteFromGuestCart(productId)),
    editGuestCart: (productId,productAmount)=>dispatch(editGuestCart(productId,productAmount)),
    handleRemoveFromCart: (productId, userId) => dispatch(deleteOrder(productId, userId)),
    checkout: (userId) => dispatch(checkout(userId, history)),
    resetOrder: () => dispatch(setOrder({}))
  };
};

export default connect(mapState, mapDispatch)(Order);
