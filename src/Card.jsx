import "./card.css";
import React from "react";

const Card = (props) => {
  const { icon, isFaceUp, onClick } = props;
  return (
    <div
      className={`card ${isFaceUp ? "--faceup" : "--facedown"}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default Card;
