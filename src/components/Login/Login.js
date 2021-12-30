import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import FastfoodIcon from "@material-ui/icons/Fastfood";

const Login = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [username, setUsername] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    const data = { fName, lName, username };
    e.preventDefault();

    setIsPending(true);

    fetch("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const message = data.status;
        if (message === "success") {
          setIsPending(false);
          history.push({
            pathname: "/home",
            state: {
              username: username,
            },
          });
        } else {
          setIsPending(false);
          setIsSame(true);
        }
      });
  };
  return (
    <div className="parent">
      <div className="child-1">
        <div className="top-bar">
          <div className="logo">
            <FastfoodIcon style={{ fill: "white", fontSize: 150 }} />
          </div>
          <div>
            <div className="name">FoodUtopia</div>
            <p className="tag-line">
              It is cheat day, do not shy away from this feast.
            </p>
          </div>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-row custom-row">
              <div className="form-group col-md-4 custom-input">
                <label for="firstName" className="label-color">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  required
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  autoComplete="off"
                ></input>
              </div>
              <div className="form-group col-md-4 custom-input">
                <label for="lastName" className="label-color">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  required
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  autoComplete="off"
                ></input>
              </div>
            </div>
            <div className="form-row custom-row">
              <div className="form-group col-md-4 custom-input">
                <label for="username" className="label-color">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off"
                ></input>
              </div>
              <div className="form-group col-md-4 custom-input">
                <div className="form-group col-md-6">
                  <label
                    for="username"
                    className="label-color"
                    style={{ visibility: "hidden" }}
                  >
                    Disclaimer
                  </label>
                  {isSame ? <p className="warning">Username taken</p> : null}
                </div>
              </div>
            </div>
            <div className="form-row custom-row">
              {!isPending && (
                <button className="btn btn-lg custom-button">Enter</button>
              )}
              {isPending && (
                <button disabled className="btn btn-lg custom-button">
                  Loading...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="child-2">
        <img
          src="https://i.imgur.com/UWxkKD3.jpg"
          alt="Front-page-pic"
          className="front-pic"
        ></img>
      </div>
    </div>
  );
};

export default Login;
