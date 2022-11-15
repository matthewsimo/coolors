import React, { useState } from "react";
import Head from "next/head";
import Swatch from "../components/swatch";
import NumberControl from "../components/number-control";

const getPointFromCBezier = (ax, ay, bx, by, cx, cy, dx, dy, t) => {
  let B0_t = Math.pow(1 - t, 3);
  let B1_t = 3 * t * Math.pow(1 - t, 2);
  let B2_t = 3 * Math.pow(t, 2) * (1 - t);
  let B3_t = Math.pow(t, 3);

  let px_t = B0_t * ax + B1_t * bx + B2_t * cx + B3_t * dx;
  let py_t = B0_t * ay + B1_t * by + B2_t * cy + B3_t * dy;

  return { x: px_t, y: py_t };
};

const Home = () => {
  const [val1, setVal1] = useState(20); // aY = start
  const [val2, setVal2] = useState(80); // dY = end
  const [val3, setVal3] = useState(25); // bX
  const [val4, setVal4] = useState(25); // bY
  const [val5, setVal5] = useState(75); // cX
  const [val6, setVal6] = useState(75); // cY
  const [val7, setVal7] = useState(25); // hue
  const [val8, setVal8] = useState(5); // samples
  const [val9, setVal9] = useState(true); // show samples?

  const [moveTarget, setMoveTarget] = useState(null); // null || 'start' || 'end'

  const plot = val => (Number(val) / 100) * 250;
  const samples = Array(parseInt(val8)).fill();

  const handleMouseDown = (e, target) => {
    setMoveTarget(target);
  };

  const handleMouseUp = (e, target) => {
    setMoveTarget(null);
  };

  const handleMouseLeave = (e, target) => {
    setMoveTarget(null);
  };

  const handleMouseMove = e => {
    if (!moveTarget) return;

    //console.log("handleMouseMove:", moveTarget);

    if (moveTarget) {
      const debug = false;
      const x = moveTarget === "start" ? val3 : val5;
      const y = moveTarget === "start" ? val4 : val6;
      const setX = moveTarget === "start" ? setVal3 : setVal5;
      const setY = moveTarget === "start" ? setVal4 : setVal6;

      const { movementX, movementY, clientX, clientY } = e;
      const newX = x + movementX;
      const newY = y + movementY;
      const { target } = e;
      //      console.log({ ...target });
      if (debug) {
        console.log("moving ", moveTarget);
        console.log({
          x,
          movementX,
          clientX,
          newX
        });

        console.log({
          y,
          movementY,
          clientY,
          newY
        });
      }

      setX(newX);
      setY(newY);
    }
  };

  return (
    <div>
      <Head>
        <title>Coolors</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Color Curve Control</h1>
        <div className="bezier-group">
          <div className="bezier-graph">
            <svg
              width="250"
              height="250"
              xmlns="http://www.w3.org/2000/svg"
              onMouseUp={e => handleMouseUp(e, "end")}
              onMouseLeave={e => handleMouseLeave(e, "start")}
              onMouseMove={handleMouseMove}
            >
              {val9 &&
                samples.map((v, i) => (
                  <line
                    key={`sample-${i}-${val8}`}
                    className="sample-line"
                    x1={plot((i / (val8 - 1)) * 100)}
                    y1={plot(0)}
                    x2={plot((i / (val8 - 1)) * 100)}
                    y2={plot(100)}
                  />
                ))}

              <path
                d={`M ${0} ${plot(val1)} C ${plot(val3)} ${plot(val4)}, 
              ${plot(val5)} ${plot(val6)}, ${plot(100)} ${plot(val2)}`}
                stroke="black"
                fill="transparent"
              />

              <line
                x1={plot(0)}
                y1={plot(val1)}
                x2={plot(val3)}
                y2={plot(val4)}
              />
              <circle
                cx={plot(val3)}
                cy={plot(val4)}
                r="5"
                onMouseDown={e => handleMouseDown(e, "start")}
                cursor="move"
                pointerEvents="visible"
              />

              <line
                x1={plot(100)}
                y1={plot(val2)}
                x2={plot(val5)}
                y2={plot(val6)}
              />
              <circle
                onMouseDown={e => handleMouseDown(e, "end")}
                cx={plot(val5)}
                cy={plot(val6)}
                r="5"
                cursor="move"
                pointerEvents="visible"
              />
            </svg>
          </div>
          <div className="bezier-controls">
            <label>Start</label>
            <NumberControl val={val1} setVal={setVal1} />
            <label>End</label>
            <NumberControl val={val2} setVal={setVal2} />

            <label>Start Control</label>
            <NumberControl val={val3} setVal={setVal3} />
            <NumberControl val={val4} setVal={setVal4} />

            <label>End Control</label>
            <NumberControl val={val5} setVal={setVal5} />
            <NumberControl val={val6} setVal={setVal6} />

            <label>Hue</label>
            <NumberControl val={val7} setVal={setVal7} />

            <label>Sample Spread</label>
            <NumberControl val={val8} setVal={setVal8} min={2} max={9} />

            <label>
              Show Sample Positions
              <input
                type="checkbox"
                checked={val9}
                onChange={v => setVal9(!val9)}
              />
            </label>
          </div>
        </div>

        <div className="swatch">
          {samples.map((v, i) => {
            const x = (i / (val8 - 1)).toPrecision(3);
            const bPoint = getPointFromCBezier(
              0,
              val1,
              val3,
              val4,
              val5,
              val6,
              100,
              val2,
              parseFloat(x)
            );
            return (
              <Swatch
                key={`swatch-${i}-${val8}-${val7}`}
                h={((Number(val7) / 100) * 360).toPrecision(4)}
                s={50}
                l={bPoint.y.toPrecision(4)}
              />
            );
          })}
        </div>
      </div>

      <style jsx>{`
        div.bezier-group {
          display: flex;
        }

        div.bezier-graph {
          width: 250px;
          height: 250px;
          border: 1px solid #000;
          padding: 10px;
        }
        div.bezier-graph svg {
          background: #f0f0f0;
        }

        circle {
          fill: red;
          stroke: red;
          z-index: 20;
        }
        line {
          stroke: #999;
          stroke-dasharray: 10px;
        }

        div.bezier-controls {
          padding: 0 40px;
        }

        .swatch {
          margin-top: 50px;
        }
      `}</style>
    </div>
  );
};

export default Home;
