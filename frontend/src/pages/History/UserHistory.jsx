import React, { useContext } from "react"
import { BgContext } from "../../context/BgContext"
import "./History.css"
import { MdDeleteOutline } from "react-icons/md"
import { GoDownload } from "react-icons/go"
import axios from "axios"
import { toast } from "react-toastify"
import { Server } from "../../../serverUrl"

const UserHistory = () => {
  const { history, setHistory, isAuthincate } = useContext(BgContext)

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${Server}/v1/api/image/delete/${id}`
      )

      if (response.data.success) {
        toast.success(response.data.message)
        setHistory(prev => prev.filter(item => item._id !== id))
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed")
      console.error(error)
    }
  }

  const downloadHandler = async (url) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = "background-removed.png"

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      window.URL.revokeObjectURL(blobUrl)
      toast.success("Downloaded!")
    } catch (error) {
      console.error(error)
      toast.error("Download failed!")
    }
  }

  if (!isAuthincate) {
    return (
      <div className="center">
        <h1>User not logged in</h1>
      </div>
    )
  }

  if (!history || history.length === 0) {
    return (
      <div className="center">
        <h1>No history found!</h1>
      </div>
    )
  }

  return (
    <div className="history">
      {history.map(item => (
        <div key={item._id} className="data">
          <img src={item.image} alt="Background Removed" />
          <div className="actions">
            <p onClick={() => deleteHandler(item._id)}>
              <MdDeleteOutline />
            </p>
            <p onClick={() => downloadHandler(item.image)}>
              <GoDownload />
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserHistory
