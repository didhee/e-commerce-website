import React from 'react'

import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'


//whatever you parse into the component in _app.js is easily accessed in the Layout.jsx through props called children.

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>Amazon Stores</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className='main-container'>
       {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout