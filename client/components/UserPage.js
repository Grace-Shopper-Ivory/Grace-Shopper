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

    let userInfo = this.props.userInfo.userInfo;
    let cartInfo = this.props.userInfo.cartInfo;
    let orderInfo = this.props.userInfo.orderInfo;

    return (
      <div className="user-page">
        <h1>Hello {userInfo.firstName}</h1>
        <div className="cart"></div>
        <div className="orders">
          <p></p>
          <h2>{userInfo.firstName}</h2>
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
