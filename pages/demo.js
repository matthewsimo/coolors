import React, { useState } from 'react'
import Head from 'next/head'
import Swatch from '../components/swatch'

const Home = () => {


  const LVals = [6, 16, 25, 35, 50, 65, 75, 88, 96];
  const [xOff, setXOff] = useState(12);
  const [yOff, setYOff] = useState(12);
  const [blur, setBlur] = useState(48);
  const [spread, setSpread] = useState(12);
  const [bgBlur, setBGBlur] = useState(6);
  const [mult, setMult] = useState(100);

  const c = v => v * mult / 100;

  return (
    <div className="body">
      <Head>
        <title>Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="cover">

        <header className="box">
          <h1><a href="/">Matthew Simo</a></h1>
          <nav>
            <a href="/about">About</a>
            <a href="/posts">Posts</a>
            <button className="nav-button">Settings</button>
          </nav>
        </header>

        <div className="nav">
          <input type="number" value={xOff} onChange={v => setXOff(v.target.value)} />
          <input type="number" value={yOff} onChange={v => setYOff(v.target.value)} />
          <input type="number" value={blur} onChange={v => setBlur(v.target.value)} />
          <input type="number" value={spread} onChange={v => setSpread(v.target.value)} />
          <input type="number" value={bgBlur} onChange={v => setBGBlur(v.target.value)} />
          <br />
          <span>{mult}</span><input type="range" value={mult} step="1" min="0" max="100" onChange={v => setMult(v.target.value)} />
        </div>

        <div>
          {LVals.map(v => <Swatch key={`key-${v}`} h={200} s={50} l={v} />)}
        </div>

        <button className="box">Click me</button>

        <div className="box">
          <h2>Some title here</h2>
          <p>lorem ipsum dolor it asldkj alskjclkj asldkj ljkalsd kjljljlllzx xz jcjo qwe adsnnm</p>
        </div>
      </div>

      <style jsx>{`
      div.body {
        background: hsla(200, 50%, ${LVals[8]}%, 1);
        padding: 1rem;
      }

      div.nav {
        margin-bottom: 3rem;
      }

      div.cover {
        display: block;
        width: calc(100vw - 2rem);
        min-height: calc(100vh - 2rem);
        background: url('/img1.jpg') center no-repeat;
        background-size: cover;
        padding: 5vh 5vw;
        box-sizing: border-box;
        border-radius: 12px;
        box-shadow: 3px 3px 15px hsla(200, 50%, ${LVals[0]}%, 0.5);
      }

      .box {
        background: hsla(1, 0%, 100%, .0);
        border: 1px solid hsl(200, 50%, ${LVals[4]}%, ${c(0.2)});
        border-radius: 1rem;
        box-shadow: ${c(xOff)}px ${c(yOff)}px ${c(blur)}px ${c(spread)}px hsla(200, 50%, ${LVals[3]}%, 0.5),
          -${c(xOff)}px -${c(yOff)}px ${c(blur)}px ${c(spread)}px hsla(200, 50%, ${LVals[7]}%, 0.5);
        margin: 1rem 0;
        backdrop-filter: blur(${c(bgBlur)}px)
      }

      button {
        padding: .5rem 1rem;
        outline: none;
      }

      header {
        padding: 1rem 2rem;
        margin: 1rem 0 2rem;
        display: flex;
      }

      h1 {
        margin: 0;
        display: inline-block;
      }

      nav {
        display: flex;
      }

      nav a {
        display: inline-block;
        margin: .5rem;
        padding: .5rem;
      }

      nav a.nav-button {
        order: 99;
      }


      a {
        color: hsla(200, 50%, ${LVals[2]}%, 1);
      }

      a:visited {
        color: hsla(200, 50%, ${LVals[2]}%, 1);
      }


      :global(body) {
        margin: 0;
      }

    `}</style>

    </div>
  )
}

export default Home
