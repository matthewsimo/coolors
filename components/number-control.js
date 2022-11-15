import React from "react";

const NumberControl = ({ val, setVal, min = 0, max = 100 }) => {
  return (
    <>
      <div className="number-control">
        <input
          type="range"
          min={min}
          max={max}
          step="1"
          value={val}
          onChange={v => setVal(v.target.value)}
        />
        <input
          type="number"
          value={val}
          onChange={v => setVal(v.target.value)}
        />
      </div>

      <style jsx>{`
        .number-control {
          display: block;
        }

        input[type="range"] {
          margin-right: 10px;
        }
        input[type="number"] {
          width: 75px;
        }
      `}</style>
    </>
  );
};

export default NumberControl;
