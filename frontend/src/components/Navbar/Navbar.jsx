import React, { useContext, useState } from 'react'
import logo from "../../assets/images/logo.png"
import "./Navbar.css"
import { BgContext } from '../../context/BgContext'
import { useNavigate } from 'react-router-dom'
import userImage from "../../assets/images/user.jpg"
import { toast } from 'react-toastify'
const Navbar = () => {
    const { setLogin, setSignup, login, signup, isAuthincate, setIsAuthincate, user, setUser } = useContext(BgContext)
    const navigate = useNavigate()
    const [isOptions, setIsOptions] = useState(false)
    const [active, setActive] = useState("home")

    console.log("User", user)
    const logoutHandler = () =>{
        toast.success("Log out successfuly")
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.href = "/"
    }


    return (
        <nav>
            <div className="left">
                <img src={logo} alt="logo" />
                <ul>
                    <li onClick={() => {navigate("/"), setActive("home")}} className={active==="home"?"active":""}>Home</li>
                    <li onClick={() =>{ navigate("/history"), setActive("history")}} className={active==="history"?"active":""}>History</li>
                </ul>
            </div>

            {!isAuthincate && (
                <div className="right">

                    <button onClick={() => { setLogin(!login), setSignup(false) }}>Log in</button>
                    <button onClick={() => { setSignup(!signup), setLogin(false) }}>Sig nup</button>
                </div>
            )}
            {isAuthincate && (
                <div className="user-profile">
                    <div className="profile">
                        <img src={userImage} alt="" onClick={()=>setIsOptions(!isOptions)} />
                        {isOptions &&

                            <div className="options">
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                                <button onClick={()=>logoutHandler()}>Logout</button>
                            </div>

                        }
                    </div>

                </div>
            )}

        </nav>
    )
}

export default Navbar
