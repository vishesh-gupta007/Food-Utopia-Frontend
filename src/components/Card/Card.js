import StarRatingComponent from "react-star-rating-component";
import { useHistory } from "react-router-dom";
import "./Card.css";

const Card = (props) => {
  const cardData = props.cardData;
  const history = useHistory();
  const username = props.username;

  return (
    <div className="card-parent">
      {cardData.map((restro) => (
        <div
          key={restro.restroId}
          onClick={() => {
            history.push({
              pathname: `/restaurant/${restro.restroId}`,
              state: {
                menuData: restro.menu,
                restroName: restro.restroName,
                restroPic: restro.restroImg,
                restroId: restro.restroId,
                username: username,
              },
            });
          }}
          className="card-child"
        >
          <div className="card-img-container">
            <img
              src={restro.restroImg}
              alt={restro.restroName}
              className="card-img"
            />
          </div>
          <div className="restro-name">{restro.restroName}</div>
          <div className="star">
            <StarRatingComponent
              name={restro.restroName}
              value={restro.rating}
              starColor={"#FF5C4D"}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
