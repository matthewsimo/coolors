import React, { useState } from 'react'
import Swatch from './swatch'

const LVals = [6, 16, 25, 35, 50, 65, 75, 88, 96];

const baseColors = {
  success: { h: 122, s: 78, l: 32 },
  warning: { h: 32, s: 100, l: 57 },
  error: { h: 360, s: 83, l: 43 },
}


const ColorsContainer = () => {
  const [hVal, setHVal] = useState(200);
  const [hVal2, setHVal2] = useState(300);


  return (
    <div>
      <div className="nav">
        <h2>h1</h2>
        <input type="range" min="0" max="360" step="1" value={hVal} onChange={v => setHVal(v.target.value)} />
        <input type="number" value={hVal} onChange={v => setHVal(v.target.value)} />
      </div>

      <div className="nav">
        <h2>h2</h2>
        <input type="range" min="0" max="360" step="1" value={hVal2} onChange={v => setHVal2(v.target.value)} />
        <input type="number" value={hVal2} onChange={v => setHVal2(v.target.value)} />
      </div>

      <div className="nav">

      </div>

      <div>
        {LVals.map(v => <Swatch key={`key-${v}`} h={hVal} s={50} l={v} />)}
      </div>

      <div>
        {LVals.map(v => <Swatch key={`key-${v}`} h={hVal2} s={50} l={v} />)}
      </div>

      <div>
        {Object.keys(baseColors).map(key => <Swatch key={`key-${key}`} {...baseColors[key]} />)}
      </div>

      <style jsx>{`
        div.nav {
          display: block;
          padding: 10px;
          margin: 20px;
        }

        input {
          margin-right: 20px;
        }
      `}</style>
    </div>
  );
}

export default ColorsContainer
