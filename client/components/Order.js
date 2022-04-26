import React from "react";
import { connect } from "react-redux";
import { fetchOrder, editOrder } from "../store/order";
import { Link } from "react-router-dom";
import guestCart from "../store/guestCart";
import { deleteFromGuestCart } from "../store";

export class Order extends React.Component {
  constructor(){
    super()
    this.state={
      loggedIn:false
    }
  }
  componentDidMount() {
    if(localStorage.getItem("token")){
      this.props.fetchOrderThunk(this.props.id);
      this.setState({loggedIn:true})
    }
  }

  render() {
    let order = this.props.order.order || {};
    let products = order.products || [];
    if(!this.state.loggedIn){
      order = {
        firstName: "Guest",
        lastName: ""
      },
      products = this.props.guestCart
    }


    let preTaxTotal = 0;
    let taxPrice = preTaxTotal * 0.0875;

    console.log("quantity",products)
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
                const quantity = this.state.loggedIn ? product.order.amount : product.amount
                const price = product.price;
                const subtotal = quantity * price;
                const inCart = this.state.loggedIn ? product.order.inCart : true
                const productId = this.state.loggedIn ? product.id : product.productId
                
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
                    <button
                      type="button"
                      onClick={() =>{
                        if(localStorage.getItem("token")){
                          this.props.handleCartChange(
                            order.id,
                            product.id,
                            quantity + 1
                          )
                        }else{
                          console.log("GUESTCART")
                        }
                      }}
                    >
                      Increase
                    </button>
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => {
                        if(localStorage.getItem("token")){
                          this.props.handleCartChange(
                            order.id,
                            product.id,
                            quantity - 1
                          )
                        }else{
                          console.log("GUESTCART")
                        }
                      }}
                    >
                      Decrease
                    </button>
                    <button
                      type="button"
                      // handleAddToCart not a real
                      onClick={() => this.state.loggedIn ? handleAddToCart(product) : this.props.deleteFromGuestCart(1)}
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
    guestCart: reduxState.guestCart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrderThunk: (id) => dispatch(fetchOrder(id)),
    handleCartChange: (orderId, productId, quantity) =>
      dispatch(editOrder(orderId, productId, quantity)),
    deleteFromGuestCart: (productId)=>dispatch(deleteFromGuestCart(productId)),
  };
};

export default connect(mapState, mapDispatch)(Order);
