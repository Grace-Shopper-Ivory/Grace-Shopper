import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import product, { fetchProducts, addToCart } from "../store/products";
import { setGuestCart, addToGuestCart } from "../store";
import { Link } from "react-router-dom";

// export class AllProducts extends React.Component {
//   componentDidMount() {
//     this.props.fetchProductsThunk();
//   }

//   handleAddToCart(products){
//       console.log(products)
//       let productId = products.id
//       let cartItem = [{productId:products.id}]
//       localStorage.setItem("cart",JSON.stringify(cartItem))
//   }
//   temp(){
//     const saved = localStorage.getItem("cart")
//     console.log(saved[1])
//   }

//   render() {
//     let productsArr = this.props.products || [];

//     return (
//       <div id="all-products">
//         {!productsArr.length
//           ? ""
//           : productsArr.map((products) => (
//               <div key={products.id}>
//                 <Link to={`/products/${products.id}`} className="products">
//                   <h2>{products.name}</h2>
//                   <img src={products.img} />
//                 </Link>
//                 <div>
//                   <p>{products.quantity>0 ? `stock: ${products.quantity}` : `out of stock`}</p>
//                   <button type="button" onClick={()=>this.handleAddToCart(products)}>add to cart</button> {/*create onClick once we have carts page*/}
//                 </div>
//                 {/* <button
//                   type="button"
//                   className="deleteStudentButton"
//                   onClick={() => this.props.deleteStudentThunk(student.id)}
//                 >
//                   X
//                 </button> */}
//               </div>
//             ))}
//             <button type="button" onClick={()=>{this.temp()}}></button>
//       </div>
//     );
//   }
// }

// const mapState = (reduxState) => {
//   return {
//     products: reduxState.products,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchProductsThunk: () => dispatch(fetchProducts()),
//   };
// };

// export default connect(mapState, mapDispatch)(AllProducts);

function AllProducts() {
  const dispatch = useDispatch();
  let amount = {};
  let quantity;

  const productsArr = useSelector((state) => state.products);
  const guestCart = useSelector((state) => state.guestCart);

  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddToCart = async (product) => {
    if (localStorage.getItem("token")) {
      if (amount[product.id]) {
        quantity = amount[product.id];
      } else {
        quantity = 1;
      }
      const toCart = {
        userId: userInfo.id,
        productId: product.id,
        amount: quantity,
        priceOfItem: parseFloat(product.price),
      };
      dispatch(addToCart(toCart));
    } else {
      if (amount[product.id]) {
        quantity = amount[product.id];
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
      dispatch(addToGuestCart(toCart));
    }
  };

  const changeAmount = (product, targetAmount) => {
    amount[product] = targetAmount;
  };

  return (
    <div id="all-products">
      {!productsArr.length
        ? ""
        : productsArr.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`} className="products">
                <h2>{product.name}</h2>
                <img src={product.img} />
              </Link>
              <div>
                <p>{product.quantity > 0 ? `in stock` : `out of stock`}: {product.quantity}</p>

                <input
                    defaultValue="1"
                    type="number"
                    min="1"
                    max={product.quantity}
                    size="2"
                    onChange={(event) => {
                      changeAmount(product.id, Number(event.target.value));
                    }}
                ></input>
                <button type="button" onClick={() => handleAddToCart(product)}>
                  add to cart
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}
export default AllProducts;
