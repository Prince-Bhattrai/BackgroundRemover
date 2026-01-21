import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
import { Server } from "../../serverUrl"

export const BgContext = createContext()

export const BgProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const [isAuthincate, setIsAuthincate] = useState(false)
    const [user, setUser] = useState(null)
    const [history, setHistory] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (!token || !storedUser) return

        const parsedUser = JSON.parse(storedUser)

        const getData = async () => {
            try {
                const historyResponse = await axios.get(
                    `${Server}/v1/api/image/data/${parsedUser._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                console.log("History Data:", historyResponse.data)
                setHistory(historyResponse.data.data)
            } catch (error) {
                console.error(error)
            }
        }

        getData()
    }, [])

    return (
        <BgContext.Provider
            value={{
                login, setLogin,
                signup, setSignup,
                isAuthincate, setIsAuthincate,
                user, setUser,
                history, setHistory
            }}
        >
            {children}
        </BgContext.Provider>
    )
}
