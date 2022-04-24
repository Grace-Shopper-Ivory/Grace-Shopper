import React from "react";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import {addToGuestCart} from "../store";
import { Link } from "react-router-dom";

export class SingleProduct extends React.Component {
  constructor(){
    super()
    this.state={
      amount:1,
      price:1
    }
  }
  componentDidMount() {
    try {
      this.props.fetchSingleProductThunk(this.props.match.params.productId);
    } catch (err) {
      console.log(err);
    }
  }

  changeAmount=(targetAmount)=>{
    this.setState({amount:targetAmount})
  }

  handleAddToCart= async (product)=>{
    if(localStorage.getItem("token")){
      console.log('USER LOGGED IN')
    }else{
        this.props.addToGuestCart(product.id,this.state.amount)
    }
  }

  render() {
    const singleProduct = this.props.singleProduct;
    const amount = {}
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
        <input type="number" min="1" max={singleProduct.quantity} size="2" onChange={(event)=>{this.changeAmount(Number(event.target.value))}}></input>
        <button type="button" onClick={()=>this.handleAddToCart(singleProduct)}>add to cart</button>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProduct,
    guestCart: state.guestCart
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProductThunk: (id) => dispatch(fetchSingleProduct(id)),
    addToGuestCart: (productId,productAmount) => dispatch(addToGuestCart(productId,productAmount))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
