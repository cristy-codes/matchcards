import "./card.css";
import React from "react";

const Card = (props) => {
  const { icon, isFaceUp, onClick, isMatched } = props;

  return (
    <div
      className={`card ${isFaceUp ? "--faceup" : "--facedown"} ${
        isMatched ? "--matched" : ""
      }`}
      onClick={onClick}
    >
      {isFaceUp && <img className="card__icon" src={icon} alt="" />}
    </div>
  );
};

export default Card;
