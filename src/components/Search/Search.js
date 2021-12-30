import { useHistory, useLocation } from "react-router-dom";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import { useState } from "react";
import "./Search.css";

const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const username = location.username;
  const data = location.data;
  const [dish, setDish] = useState("");
  const [insideName, setInsideName] = useState([]);
  const [insideId, setInsideId] = useState([]);
  const [insidePic, setInsidePic] = useState([]);
  const [insideMenu, setInsideMenu] = useState([]);
  const [foodName, setFoodName] = useState([]);
  const [foodPrice, setFoodPrice] = useState([]);
  const [foodImg, setFoodImg] = useState([]);

  function handleSubmit() {
    setInsideName([]);
    setInsideId([]);
    setInsidePic([]);
    setInsideMenu([]);
    setFoodName([]);
    setFoodPrice([]);
    setFoodImg([]);
    data.forEach(function (main) {
      let menu = main.menu;
      menu.forEach(function (menuArray) {
        let name = menuArray.name.toLowerCase();
        const searchName = name.replace(/-|\s/g, "");
        const lowerDish = dish.toLowerCase();
        const searchDish = lowerDish.replace(/-|\s/g, "");

        if (searchName.includes(searchDish)) {
          setFoodName((prevValue) => {
            return [...prevValue, menuArray.name];
          });
          setInsideName((prevValue) => {
            return [...prevValue, menuArray.hotelName];
          });
          setInsideId((prevValue) => {
            return [...prevValue, main.restroId];
          });
          setInsidePic((prevValue) => {
            return [...prevValue, main.restroImg];
          });
          setInsideMenu((prevValue) => {
            return [...prevValue, main.menu];
          });
          setFoodPrice((prevValue) => {
            return [...prevValue, menuArray.price];
          });
          setFoodImg((prevValue) => {
            return [...prevValue, menuArray.foodImg];
          });
        }
      });
    });
  }

  return (
    <div>
      <div className="search-bar-parent">
        <div className="heading">
          <FastfoodIcon style={{ fill: "white", fontSize: 50 }} />
          <h1 className="heading-name">FoodUtopia</h1>
        </div>
        <div className="input">
          <input
            class="form-control form-control-lg search-box"
            type="text"
            placeholder="Search For Dishes"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            required
          />
          <button onClick={handleSubmit} className="search-button">
            <i class="fas fa-search search-bar-icon"></i>
            Search
          </button>
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
      <div className="search-body-parent">
        {foodName.map((start, index) => {
          return (
            <div
              className="search-body-child"
              id={start}
              onClick={() => {
                history.push({
                  pathname: `/restaurant/${insideId[index]}`,
                  state: {
                    menuData: insideMenu[index],
                    restroName: insideName[index],
                    restroPic: insidePic[index],
                    restroId: insideId[index],
                    username: username,
                  },
                });
              }}
            >
              <div className="search-img-container">
                <img
                  className="search-img"
                  src={foodImg[index]}
                  alt={start}
                ></img>
              </div>
              <div className="search-restro">{insideName[index]}</div>
              <div className="search-dish">
                <div className="search-dish-name">{start}</div>
                <div className="search-dish-price">₹{foodPrice[index]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
