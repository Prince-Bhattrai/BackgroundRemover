import React, { useContext, useState } from 'react'
import "./Box.css"
import bgVideo from "../../assets/images/bg-video.mp4"
import axios from 'axios'
import { BgContext } from '../../context/BgContext'
import { toast } from 'react-toastify'
import { Server } from '../../../serverUrl'

const Box = () => {
    const [inputImage, setInputImage] = useState(null) // preview
    const [file, setFile] = useState(null)             // real file
    const [loading, setLoading] = useState(false)
    const [responseImage, setResponseImage] = useState("")
    const { user, setUser, isAuthincate, setIsAuthincate , history, setHistory} = useContext(BgContext)


    const handleImageChange = (e) => {
        if (loading) {
            return toast.error("Please wait a moment file is processing!")
        }
        setResponseImage("")
        setFile(null)
        setInputImage(null)
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
            setInputImage(URL.createObjectURL(selectedFile))
            setResponseImage("")
        }
    }

    const submitHandler = async () => {
        if (loading) return toast.error("File processing")
        if (!file) return toast.error("No image selected")

        setLoading(true)


        try {

            const formData = new FormData()
            formData.append("image", file)
            formData.append("id", user._id)

            const response = await axios.post(
                `${Server}/v1/api/image/rm-bg`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )

            setResponseImage(response.data.image.image)
            if(response.data.success){
                setHistory((prev)=>[...prev, response.data.image])
                toast.success(response.data.message)
            }
            

        } catch (error) {
            console.error(error.response?.data || error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
            
        }
    }

    const downloadHandler = async (url) => {
        try {
            const response = await fetch(url, { mode: "cors" })
            const blob = await response.blob()

            const blobUrl = URL.createObjectURL(blob)
            const aTag = document.createElement("a")

            aTag.href = blobUrl
            aTag.download = "background-removed.png"

            document.body.appendChild(aTag)
            aTag.click()
            document.body.removeChild(aTag)

            URL.revokeObjectURL(blobUrl)
        } catch (error) {
            console.error("Download failed:", error)
        }
    }



    return (
        <div className='box'>
            <div className="left">
                <div className="items">
                    {isAuthincate && (
                        <>
                            <label htmlFor="image-in">Upload Image</label>
                            <input
                                type="file"
                                id='image-in'
                                accept='image/*'
                                onChange={handleImageChange}
                            />
                            <p>Or drop a file</p>
                        </>
                    )}
                    {!isAuthincate && (
                        <h1>Please login first</h1>
                    )}
                </div>
            </div>

            <div className="right">
                {responseImage ? (
                    <>
                        <img src={responseImage} alt="Result" />
                        <button onClick={() => downloadHandler(responseImage)} className='download'>Download</button>

                    </>
                ) : inputImage ? (
                    <>

                        {
                            loading ?
                                <div className='outer'>
                                    <div className="inner">

                                    </div>

                                </div> : <img src={inputImage} alt="Preview" />
                        }
                        <button
                            onClick={submitHandler}
                            className={inputImage ? "yes" : "no"}
                        >
                            {loading ? "Processing..." : "Remove Background"}
                        </button>
                    </>
                ) : (
                    <>
                        <video src={bgVideo} loop autoPlay muted />
                        <h1>Remove Image background</h1>
                        <p>100% Automatically and free</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Box
