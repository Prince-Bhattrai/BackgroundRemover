import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Box from '../../components/Box/Box'
import Signup from '../../components/Signup/Signup'
import { BgContext } from '../../context/BgContext'
import "./Home.css"
const Home = () => {
  const { login, signup, setLogin, setSignup } = useContext(BgContext)
  return (
    <div  className={login || signup ?"bg-dark":"home"}>

      <Box />
      
    </div>
  )
}

export default Home
