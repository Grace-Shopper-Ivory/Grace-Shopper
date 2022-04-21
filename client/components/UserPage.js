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
    return (
      <div className="user-page">
        <h1>Hello {this.props.userInfo.userInfo.firstName}</h1>
        <div className="cart"></div>
        <div className="orders">
          <p>Orders info</p>
        </div>
        <div className="payment">
          <p>Payment info</p>
        </div>
      </div>
    );
  }
}
const mapState = (reduxState) => {
  return {
    userInfo: reduxState.info,
    cartInfo: reduxState.info.cartItems,
    orderInfo: reduxState.orderInfo,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchInfoThunk: (id) => dispatch(fetchInfo(id)),
  };
};

export default connect(mapState, mapDispatch)(UserPage);
