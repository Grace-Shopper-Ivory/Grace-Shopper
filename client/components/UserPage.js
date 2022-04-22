import React from 'react';
import { connect } from 'react-redux';
import { fetchInfo } from '../store/info';
import { Link } from 'react-router-dom';

export class UserPage extends React.Component {
  componentDidMount() {
    this.props.fetchInfoThunk(this.props.match.params.id);
  }
  render() {
    console.log(this.props);
    let userInfo = this.props.userInfo.userInfo || {};
    let productInfo = this.props.userInfo.ProductInfo || [];

    return (
      <div className="user-page">
        <h1>
          Hello {userInfo.firstName} {userInfo.lastName}
        </h1>
        <div className="cart">
          <h2>Cart Info:</h2>
          {!productInfo.length
            ? ''
            : productInfo.map((product) =>
                product.order.inCart ? (
                  ''
                ) : (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`} className="products">
                      <h2>{product.name}</h2>
                    </Link>
                    <img src={product.img} />
                  </div>
                )
              )}
        </div>
        <div className="orders">
          <h2>Order Info:</h2>
          {!productInfo.length
            ? ''
            : productInfo.map((product) =>
                !product.order.inCart ? (
                  ''
                ) : (
                  <div key={product.id}>
                    <Link to={`/products/${product.id}`} className="products">
                      <h2>{product.name}</h2>
                    </Link>
                    <img src={product.img} />
                  </div>
                )
              )}
        </div>
        <div className="payment">
          <h2>Payment Info:</h2>
          <h3>Card Information: {userInfo.paymentInfo}</h3>
          <button>Update Payment Info</button>
        </div>
      </div>
    );
  }
}
const mapState = (reduxState) => {
  return {
    userInfo: reduxState.info,
    productInfo: reduxState.info.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchInfoThunk: (id) => dispatch(fetchInfo(id)),
  };
};

export default connect(mapState, mapDispatch)(UserPage);