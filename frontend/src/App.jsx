import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './components/Signup/Signup'
import { BgContext } from './context/BgContext'
import UserHistory from './pages/History/UserHistory'
import Navbar from './components/Navbar/Navbar'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { Server } from '../serverUrl'

function App() {
  const { login, signup, user, setUser, isAuthincate, setIsAuthincate } = useContext(BgContext)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    const parsedUser = userData ? JSON.parse(userData) : null

    if (!token || !userData) {
      setIsAuthincate(false)
      return
    }
    
    const verify = async () => {
      try {
        const response = await axios.get(`${Server}/v1/api/user/verify`, {
          headers:{
            "Authorization":`Bearer ${token}`
          }
        }) 

        console.log("Token response", response.data)
        if(response.data.success){
          setIsAuthincate(true)
          setUser(parsedUser)
        } else {
          setIsAuthincate(false)
        }

      } catch (error) {
        console.log(error)
        setIsAuthincate(false)
      }
    }

    verify()

  }, [])

  return (
    <>
    <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<UserHistory />} />
      </Routes>
      {login || signup ? <Signup /> : null}
    </>
  )
}

export default App
