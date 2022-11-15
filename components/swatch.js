import React from "react";

const Swatch = ({ h, s, l }) => (
  <>
    <p>
      <span>H: {h}</span> <span>S: {s}%</span> <span>L: {l}%</span>
    </p>
    <style jsx>{`
      p {
        display: inline-block;
        width: 100px;
        height: 100px;
        padding: 10px;
        margin: 10px;
        background-color: hsl(${h}, ${s}%, ${l}%);
        color: ${l <= 25 ? "white" : "black"};
      }
      p span {
        display: block;
      }
    `}</style>
  </>
);

export default Swatch;
