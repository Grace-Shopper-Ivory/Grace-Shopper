import React from 'react';
import { connect } from 'react-redux';
import { fetchOrder } from '../store/order';
import { Link } from 'react-router-dom';

export class Order extends React.Component {
  componentDidMount() {
    this.props.fetchOrderThunk(this.props.id);
  }
  render() {
    //console.log(this.props);

    // let userInfo = this.props.userInfo.userInfo;
    let order = this.props.order.order || {};
    let products = order.products || [];
    //let userInfo = order.userInfo || [];
    console.log("this.products ",products);

    

    return (
        <div className="user-page">
         <h1>
          Hello {order.firstName} {order.lastName}
        </h1>
            <div className="cart">
            <h2>Cart Info:</h2>
            {!products.length
                ? ''
                : products.map((product) =>
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
  };
};

export default connect(mapState, mapDispatch)(Order);
