import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import lodash from "lodash";
import "./Cart.css";

const Cart = () => {
  const location = useLocation();
  const history = useHistory();
  const username = location.username;
  const restaurantName = location.restaurantName;
  const [img, setImg] = useState([]);
  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);
  const [id, setId] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const sum = lodash.sum(price);

  useEffect(() => {
    setIsPending(true);
    const search = { username };
    fetch("/api/showing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsPending(false);
        setImg(data.cart.foodImg);
        setName(data.cart.foodName);
        setPrice(data.cart.foodPrice);
        setId(data.cart.foodId);
      });
  }, []);

  return (
    <div>
      <div className="cart-bar-parent">
        <div className="heading">
          <FastfoodIcon style={{ fill: "white", fontSize: 50 }} />
          <h1 className="heading-name">FoodUtopia</h1>
        </div>
        <div className="greeting">{restaurantName}</div>
        <div className="clear-cart-container">
          <button
            className="clear-cart-button"
            onClick={() => {
              history.push({
                pathname: "/home",
                state: {
                  username: username,
                },
              });
            }}
          >
            Clear Cart & Home
          </button>
        </div>
      </div>
      <div className="cart-body-parent">
        {isPending && (
          <div className="loading">
            <div>Loading...</div>
          </div>
        )}
        {!isPending && (
          <div className="cart-body-child">
            <div className="cart-dish">
              {img.map((start, index) => {
                return (
                  <div className="cart-dish-child" id={id[index]}>
                    <div className="cart-img-container">
                      <img
                        className="cart-img"
                        src={start}
                        alt={name[index]}
                      ></img>
                    </div>
                    <div className="cart-detail">
                      <div className="cart-name">{name[index]}</div>
                      <div className="cart-price">{price[index]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="payment">
              <div className="total-item">Items - {img.length}</div>
              {name.map((search, index) => {
                return (
                  <div className="bill">
                    <div className="bill-name">{search}</div>
                    <div className="bill-price">₹{price[index]}</div>
                  </div>
                );
              })}
              <div className="total-bill">
                <div className="total-name">Amount</div>
                <div className="total-price">₹{sum}</div>
              </div>
              <div className="proceed-container">
                <button
                  className="proceed-button"
                  onClick={() => {
                    history.push({
                      pathname: "/address",
                      state: {
                        username: username,
                        sum: sum,
                      },
                    });
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
