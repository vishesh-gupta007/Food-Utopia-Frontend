import { useLocation, useHistory, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./Menu.css";

const Menu = () => {
  const location = useLocation();
  const history = useHistory();
  const restroName = location.state.restroName;
  const restroPic = location.state.restroPic;
  const restroId = location.state.restroId;
  const menu = location.state.menuData;
  const username = location.state.username;
  const [foodName, setName] = useState([]);
  const [foodPrice, setPrice] = useState([]);
  const [foodImg, setImg] = useState([]);
  const [foodId, setFoodId] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [background, setBackground] = useState("");
  const { id } = useParams();
  useEffect(() => {
    document.getElementById("count").scrollIntoView();
  }, []);
  useEffect(() => {
    setIsPending(true);
    const cartData = {
      username,
      restroName,
      foodId,
      foodName,
      foodPrice,
      foodImg,
    };
    if (id == 1) {
      setBackground("#006691ab");
    } else if (id == 2) {
      setBackground("#fbbc01b0");
    } else if (id == 3) {
      setBackground("#e6242bb7");
    } else if (id == 4) {
      setBackground("#c51230ca");
    } else if (id == 5) {
      setBackground("#fec4059a");
    } else if (id == 6) {
      setBackground("#ed4697b7");
    } else if (id == 7) {
      setBackground("#c30e2cce");
    } else if (id == 8) {
      setBackground("#fd821d86");
    } else if (id == 9) {
      setBackground("#007041c2");
    } else {
      setBackground("#fd821d86");
    }
    fetch("/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        const status = data.status;
        if (status === "UpdateSuccess") {
          document.getElementById("count").scrollIntoView();
          setIsPending(false);
        } else {
          setIsPending(false);
        }
      });
  }, [foodId]);

  return (
    <div>
      <div className="menu-bar-parent" id="count">
        <div className="heading">
          <FastfoodIcon style={{ fill: "white", fontSize: 50 }} />
          <h1 className="heading-name">FoodUtopia</h1>
        </div>
        <div className="greeting">{restroName}</div>
        <div className="links">
          <div className="cart">
            <div className="cart-count">{foodId.length}</div>
            <Link
              to={{
                pathname: "/cart",
                username: username,
                restroId: restroId,
                restaurantName: restroName,
              }}
            >
              <i class="fas fa-shopping-bag home-icon"></i>
            </Link>
          </div>
          <div className="home">
            <button
              className="home-button"
              onClick={() => {
                history.push({
                  pathname: "/home",
                  state: {
                    username: username,
                  },
                });
              }}
            >
              <i class="fas fa-times home-icon"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="menu-body-parent">
        <div className="dish-course">Mains</div>
        <div className="menu-card-parent">
          {menu.map(function (search) {
            if (search.course === "Mains") {
              return (
                <div
                  key={search.foodId}
                  className="menu-card-child"
                  style={{ backgroundColor: background }}
                >
                  <div className="menu-img-container">
                    <img
                      className="menu-img"
                      src={search.foodImg}
                      alt={search.name}
                    ></img>
                  </div>
                  <div className="menu-detail">
                    <div className="menu-name">{search.name}</div>
                    <div className="menu-price">₹{search.price}</div>
                  </div>
                  {!isPending && (
                    <div className="add-container">
                      <button
                        className="add-button"
                        value={search.foodId}
                        onClick={() => {
                          setName((prevName) => {
                            return [...prevName, search.name];
                          });
                          setPrice((prevPrice) => {
                            return [...prevPrice, search.price];
                          });
                          setImg((prevImg) => {
                            return [...prevImg, search.foodImg];
                          });
                          setFoodId((prevId) => {
                            return [...prevId, search.foodId];
                          });
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                  {isPending && (
                    <div className="add-container">
                      <button
                        disabled
                        className="add-button"
                        value={search.foodId}
                      >
                        Adding...
                      </button>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
        <div className="dish-course">Sides</div>
        <div className="menu-card-parent">
          {menu.map(function (search) {
            if (search.course === "Sides") {
              return (
                <div
                  key={search.foodId}
                  className="menu-card-child"
                  style={{ backgroundColor: background }}
                >
                  <div className="menu-img-container">
                    <img
                      className="menu-img"
                      src={search.foodImg}
                      alt={search.name}
                    ></img>
                  </div>
                  <div className="menu-detail">
                    <div className="menu-name">{search.name}</div>
                    <div className="menu-price">₹{search.price}</div>
                  </div>
                  {!isPending && (
                    <div className="add-container">
                      <button
                        className="add-button"
                        value={search.foodId}
                        onClick={() => {
                          setName((prevName) => {
                            return [...prevName, search.name];
                          });
                          setPrice((prevPrice) => {
                            return [...prevPrice, search.price];
                          });
                          setImg((prevImg) => {
                            return [...prevImg, search.foodImg];
                          });
                          setFoodId((prevId) => {
                            return [...prevId, search.foodId];
                          });
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                  {isPending && (
                    <div className="add-container">
                      <button
                        disabled
                        className="add-button"
                        value={search.foodId}
                      >
                        Adding...
                      </button>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
        <div className="dish-course">Desserts & Beverages</div>
        <div className="menu-card-parent">
          {menu.map(function (search) {
            if (search.course === "Desserts") {
              return (
                <div
                  key={search.foodId}
                  className="menu-card-child"
                  style={{ backgroundColor: background }}
                >
                  <div className="menu-img-container">
                    <img
                      className="menu-img"
                      src={search.foodImg}
                      alt={search.name}
                    ></img>
                  </div>
                  <div className="menu-detail">
                    <div className="menu-name">{search.name}</div>
                    <div className="menu-price">₹{search.price}</div>
                  </div>
                  {!isPending && (
                    <div className="add-container">
                      <button
                        className="add-button"
                        value={search.foodId}
                        onClick={() => {
                          setName((prevName) => {
                            return [...prevName, search.name];
                          });
                          setPrice((prevPrice) => {
                            return [...prevPrice, search.price];
                          });
                          setImg((prevImg) => {
                            return [...prevImg, search.foodImg];
                          });
                          setFoodId((prevId) => {
                            return [...prevId, search.foodId];
                          });
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                  {isPending && (
                    <div className="add-container">
                      <button
                        disabled
                        className="add-button"
                        value={search.foodId}
                      >
                        Adding...
                      </button>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
