import React from "react";
import "../styles/App.css";

export default function Element({ image, altText, value }) {
  return (
    <div className="Element Flex-Center">
      <img src={image} alt={altText} />
      <span>{value}</span>
    </div>
  );
}
