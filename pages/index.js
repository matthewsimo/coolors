import React from 'react'
import Head from 'next/head'
import ColorsContainer from '../components/colors-container'

const Home = () => (
  <div>
    <Head>
      <title>Coolors</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <ColorsContainer />

  </div>
)

export default Home
