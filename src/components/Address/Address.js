import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./Address.css";
const Address = () => {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const location = useLocation();
  const history = useHistory();
  const username = location.state.username;
  const sum = location.state.sum;
  const [isButtonPending, setIsButtonPending] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    document.getElementById("address-bar").scrollIntoView();
    const search = { username };
    fetch("/showing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsPending(false);
        setCity(data.city);
        setAddress(data.address);
      });
  }, []);

  const handleSubmit = (e) => {
    const data = { username, city, address };
    e.preventDefault();

    setIsButtonPending(true);

    fetch("/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const message = data.status;
        if (message === "UpdateSuccess") {
          setIsButtonPending(false);
          history.push({
            pathname: "/end",
            state: {
              username: username,
              sum: sum,
            },
          });
        } else {
          setIsButtonPending(false);
        }
      });
  };

  return (
    <div>
      <div className="cart-bar-parent" id="address-bar">
        <div className="heading">
          <FastfoodIcon style={{ fill: "white", fontSize: 50 }} />
          <h1 className="heading-name">FoodUtopia</h1>
        </div>
        <div className="greeting">Confirm Address</div>
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
      <div className="address-body-parent">
        {isPending && (
          <div className="loading">
            <div>Loading...</div>
          </div>
        )}
        {!isPending && (
          <div className="address-form">
            <form onSubmit={handleSubmit}>
              <div class="form-group row address-input">
                <label
                  for="colFormLabelLg"
                  class="col-sm-2 col-form-label col-form-label-lg address-label"
                >
                  City
                </label>
                <div class="col-sm-10 address-input-div">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="colFormLabelLg"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div class="form-group row address-input">
                <label
                  for="colFormLabelLg"
                  class="col-sm-2 col-form-label col-form-label-lg address-label"
                >
                  Address
                </label>
                <div class="col-sm-10 address-input-div">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="colFormLabelLg"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="proceed-container">
                {!isButtonPending && (
                  <button className="proceed-button">Confirm</button>
                )}
                {isButtonPending && (
                  <button className="proceed-button" disabled>
                    Loading
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
