import { useState } from 'react'
import { Header } from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import { Home } from './components/layouts/Home'
import { SideNav } from './components/layouts/SideNav'


function App() {

  return (
    <div className='wrapper'>

      <Header />
      <Home />
      <SideNav />
      <Footer />
  
    </div>
  )
}

export default App
