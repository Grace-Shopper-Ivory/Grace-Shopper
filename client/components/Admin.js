import React from "react";
import { connect } from "react-redux";
import { fetchInfo } from "../store/info";
import { fetchAllUsers } from "../store/admin";
import { fetchProducts } from "../store/products";
import { fetchAllOrders } from "../store/allOrders";
import { Link } from "react-router-dom";

export class Admin extends React.Component {
  componentDidMount() {
    this.props.fetchInfoThunk(this.props.match.params.id);
    this.props.fetchAllUsersThunk();
    this.props.fetchAllProductsThunk();
    this.props.fetchAllOrdersThunk();
  }

  render() {
    //console.log(this.props);

    let user = this.props.user.userInfo || {};
    let allUser = this.props.users || [];
    let allProducts = this.props.products || [];
    let allOrders = this.props.orders || [];

    return (
      <div className="admin-page">
        <h1>
          Hello {user.firstName} {user.lastName}
        </h1>
        <div className="user-list">
          <h2> All Users </h2>
          <div>
            {allUser.map((user) => (
              <div key={user.id}>
                <Link to={`/userpage/${user.id}`}>
                  <h2>
                    Name: {user.firstName} {user.lastName}
                  </h2>
                </Link>
                <h2>
                  <span>{<br />} </span>
                  Email:{user.email}
                  <span>{<br />} </span>
                  <span>{<br />} </span>
                </h2>
              </div>
            ))}
          </div>
        </div>
        <div className="product-list">
          <h2>All Products</h2>
          <div className="allProds">
            {allProducts.map((product) => (
              <div key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <h2> {product.name} </h2>
                </Link>
                <img src={product.img} />
              </div>
            ))}
          </div>
        </div>
        <div className="order-list">
          <h2> All Orders</h2>
          <div className="allOrders">
            {allOrders.map((order) => (
              <div key={order.Orderid}>
                <h2> Order ID: {order.Orderid}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    user: reduxState.info,
    users: reduxState.users,
    products: reduxState.products,
    orders: reduxState.allOrders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchInfoThunk: (id) => dispatch(fetchInfo(id)),
    fetchAllUsersThunk: () => dispatch(fetchAllUsers()),
    fetchAllProductsThunk: () => dispatch(fetchProducts()),
    fetchAllOrdersThunk: () => dispatch(fetchAllOrders()),
  };
};

export default connect(mapState, mapDispatch)(Admin);
