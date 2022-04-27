import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../store/products";
import {addToGuestCart } from "../store";
import { Link } from "react-router-dom";

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
              {product.quantity>0 ? <div>
                <p>in stock</p>

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
              </div> : <div><p>out of stock</p></div>}
            </div>
          ))}
    </div>
  );
}
export default AllProducts;
