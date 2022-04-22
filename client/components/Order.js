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
    let order = this.props.order || {};
    //let products = order.products || [];
    console.log("this.props",this.props);
    // console.log('order',this.props.order);
    // console.log('order order', this.props.order.order);
    // console.log('order admin', this.props.order.cart.);





    return (
        <div className="user-page">hello
        {/* <h1>
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
            </div>*/}
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
