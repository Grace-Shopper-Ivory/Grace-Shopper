import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleProduct } from "../store/singleProduct";
import {addToGuestCart} from "../store";

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

  componentDidUpdate(prevProps){
    if(prevProps.singleProduct.id !== this.props.singleProduct.id){
      this.setState({price:this.props.singleProduct.price})
    }

  }

  changeAmount=(targetAmount)=>{
    this.setState({amount:targetAmount, price:targetAmount*this.props.singleProduct.price})
  }

  handleAddToCart= async (product)=>{
    let quantity
    if(localStorage.getItem("token")){
      console.log('USER LOGGED IN')
    }else{
        if (this.state.amount) {
          quantity = this.state.amount;
        } else {
          quantity = 1;
        }
        const toCart = {
          productId: product.id,
          name: product.name,
          amount: quantity,
          img: product.img,
          price: product.price,
        };
        this.props.addToGuestCart(toCart);
    }
  }

  render() {
    const singleProduct = this.props.singleProduct;
    return (
      <div className="singleProduct">
        {/* <Link to="/products"> Back To All Products</Link> */}
        <span>{<br />}</span>
        <h2>{singleProduct.name}</h2>
        <p>
          <b>About this item: </b>
          <span>{<br />}</span>
          {singleProduct.description}
        </p>
        <img src={singleProduct.img} />

        <p>{this.props.singleProduct.quantity>0 ? `in stock` : `out of stock`}</p>
        {this.props.singleProduct.quantity>0 ? <a>
        <input type="number" min="1" max={singleProduct.quantity} size="2" onChange={(event)=>{this.changeAmount(Number(event.target.value))}}></input>
        <p>{Number(this.state.price).toFixed(2)}</p>
        <button type="button" onClick={()=>this.handleAddToCart(singleProduct)}>add to cart</button>
        </a> : <a><p>check back later</p></a>}

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
