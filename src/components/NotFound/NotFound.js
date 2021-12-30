import { useHistory } from "react-router-dom";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./NotFound.css";
const NotFound = () => {
  const history = useHistory();
  return (
    <div>
      <div className="cart-bar-parent">
        <div className="heading">
          <FastfoodIcon style={{ fill: "white", fontSize: 50 }} />
          <h1 className="heading-name">FoodUtopia</h1>
        </div>
        <div className="greeting">ERROR</div>
        <div className="clear-cart-container">
          <button
            className="clear-cart-button"
            onClick={() => {
              history.push("/");
            }}
          >
            Go Back
          </button>
        </div>
      </div>
      <div className="error-body-parent">
        <div className="error-body">404 Page Not Found</div>
      </div>
    </div>
  );
};

export default NotFound;
