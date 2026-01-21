import React, { useContext, useState } from 'react'
import { BgContext } from '../../context/BgContext'
import "./Signup.css"
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { RxCross2 } from "react-icons/rx"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Server } from '../../../serverUrl'

const Signup = () => {
    const { login, signup, setLogin, setSignup } = useContext(BgContext)

    const [isGoogle, setIsGoogle] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const submitAuth = async ({ name, email, password, isGoogle }) => {
        try {
            if (login) {
                const response = await axios.post(
                    `${Server}/v1/api/user/log-in`,
                    { email, password, isGoogle }
                )
                console.log(response.data)
                
                if (response.data.success) {
                    toast.success(response.data.message)
                    localStorage.setItem("token",response.data.token)
                    const strUser = JSON.stringify(response.data.user)
                    localStorage.setItem("user", strUser)
                    setLogin(false)
                    window.location.href = "/"
                    
                }
            }

            if (signup) {
                const response = await axios.post(
                    `${Server}/v1/api/user/sign-up`,
                    { name, email, password, isGoogle }
                )
                console.log(response.data)

                if (response.data.success) {
                    toast.success(response.data.message)
                    setSignup(false)
                    setLogin(true)
                    window.location.href = "/"
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const formhandler = (e) => {
        e?.preventDefault()

        if (!email) return toast.error("Email required")
        if (!isGoogle && !password) return toast.error("Password required")
        if (signup && !name) return toast.error("Name required")

        submitAuth({ name, email, password, isGoogle })
    }

    return (
        <div className="signup">
            <div className='inner'>
                <p
                    className='cross'
                    onClick={() => {
                        setLogin(false)
                        setSignup(false)
                    }}
                >
                    <RxCross2 />
                </p>

                <h1>{login ? "Log in" : "Sign up"}</h1>

                <form onSubmit={formhandler}>
                    {signup && (
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Full name'
                        />
                    )}

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='Email'
                    />

                    {!isGoogle && (
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                        />
                    )}

                    <button type="submit">Submit</button>
                </form>

                {/* 🔥 GOOGLE LOGIN (CORRECT WAY) */}
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(credentialResponse.credential)

                        const googleUser = {
                            name: `${decoded.given_name} ${decoded.family_name}`,
                            email: decoded.email,
                            password: "",
                            isGoogle: true
                        }

                        setIsGoogle(true)
                        setName(googleUser.name)
                        setEmail(googleUser.email)

                        submitAuth(googleUser)
                    }}
                    onError={() => {
                        console.log("Google Login Failed")
                    }}
                />
            </div>
        </div>
    )
}

export default Signup
