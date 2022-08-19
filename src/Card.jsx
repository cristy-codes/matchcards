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
      {isFaceUp && icon}
    </div>
  );
};

export default Card;
