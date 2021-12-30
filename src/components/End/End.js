import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./End.css";
const End = () => {
  const location = useLocation();
  const history = useHistory();
  const username = location.state.username;
  const sum = location.state.sum;
  const [restroName, setRestroName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [name, setName] = useState([]);
  const [display, setDisplay] = useState("none");
  useEffect(() => {
    document.getElementById("end-bar").scrollIntoView();
  }, []);
  useEffect(() => {
    if (name.length == 0) {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
    const search = { username };
    fetch("/showing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((data) => {
        setRestroName(data.cart.restaurantName);
        setCity(data.city);
        setAddress(data.address);
        setName(data.cart.foodName);
        setFName(data.fName);
        setLName(data.lName);
      });
  }, [name]);

  return (
    <div>
      <div className="cart-bar-parent" id="end-bar">
        <div className="heading">
          <FastfoodIcon style={{ fill: "white", fontSize: 50 }} />
          <h1 className="heading-name">FoodUtopia</h1>
        </div>
        <div className="greeting">Order Confirmed</div>
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
            Back To Home
          </button>
        </div>
      </div>
      <div className="end-body">
        <div className="thank">Your order from {restroName} is confirmed </div>
        <div className="detail-body-parent">
          <div className="order-details">
            Order under the name {fName} {lName} will be delivered shortly to{" "}
            {address} , {city} .
          </div>
          <div className="final-bill">
            <div className="no-item" style={{ display: display }}>
              No Items
            </div>
            <div className="final-list">
              <ol>
                {name.map((list) => (
                  <li className="list-item">{list}</li>
                ))}
              </ol>
            </div>
            <div className="total-bill">
              <div className="total-name">Amount</div>
              <div className="total-price" style={{ marginLeft: 8 }}>
                ₹{sum}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default End;
