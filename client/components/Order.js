import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/order';
import { Link } from 'react-router-dom';

export class Order extends React.Component {
  componentDidMount() {
    this.props.fetchInfoThunk(this.props.match.params.id);
  }
  render() {
    console.log(this.props);

    let userInfo = this.props.userInfo.userInfo;
    let cartOrder = this.props.userInfo.cartOrder;
    

    return (
      <div className="user-page">
        <h1>Hello {user.firstName}</h1>
        {/* <div className="cart"></div>
        <div className="orders">
          <p></p>
          <h2>{userInfo.firstName}</h2>
        </div>
        <div className="payment">
          <p>Payment info</p>
        </div> */}
      </div>
    );
  }
}
const mapState = (reduxState) => {
  return {
    order: reduxState.order,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchOrderThunk: (id) => dispatch(fetchOrder(id)),
  };
};

export default connect(mapState, mapDispatch)(Order);
