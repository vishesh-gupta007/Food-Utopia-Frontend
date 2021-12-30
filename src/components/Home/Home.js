import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const username = location.state.username;
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch("/api/restro", { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setCard(data);
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
      <Navbar username={username} card={card} />
      <div className="home-parent">
        {error && (
          <div className="loading">
            <div>{error}</div>
          </div>
        )}
        {isPending && (
          <div className="loading">
            <div>Loading...</div>
          </div>
        )}
        {card && <Card cardData={card} username={username} />}
      </div>
    </div>
  );
};

export default Home;
