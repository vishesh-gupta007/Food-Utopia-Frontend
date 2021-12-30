import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./Navbar.css";

const Navbar = (props) => {
  const username = props.username;
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [fName, setFName] = useState("");
  const date = new Date();
  const currentTime = date.getHours();
  const card = props.card;

  let greeting;
  if (currentTime >= 6 && currentTime < 12) {
    greeting = "Rise & shine";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Lunch time";
  } else if (currentTime >= 18 && currentTime < 23) {
    greeting = "Dinner time";
  } else {
    greeting = "Get a midnight snack";
  }

  useEffect(() => {
    const abortCont = new AbortController();
    fetch("/api/user", { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        data.forEach(function (search) {
          if (search.username === username) {
            setFName(search.fName);
          }
        });
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, []);

  return (
    <div>
      {error && (
        <div className="loading">
          <div>{error}</div>
        </div>
      )}
      {isPending ? (
        <div className="loading">
          <div>Loading...</div>
        </div>
      ) : error ? null : (
        <div className="custom-navbar">
          <div className="heading">
            <FastfoodIcon style={{ fill: "white", fontSize: 50 }} />
            <h1 className="heading-name">FoodUtopia</h1>
          </div>
          <div className="greeting">
            {greeting},{fName}
          </div>
          <div className="search">
            <i class="fas fa-search home-search"></i>
            <Link
              to={{
                pathname: "/search",
                username: username,
                data: card,
              }}
              className="search-link"
            >
              Search
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
