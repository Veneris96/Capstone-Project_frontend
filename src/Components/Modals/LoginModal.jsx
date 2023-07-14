import React, { useState, useEffect } from 'react'
import gitHubLogo from "../../icons/icons8-github.svg"
import facebookLogo from "../../icons/icons8-facebook.svg"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../Styles/LoginModal.css"

const LoginModal = ({ open, onClose }) => {

    let timeout;

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("")

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedUser"))
        if (user && user?.email > 0) {
            window.location.href = ("/")
        }
    }, [])

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    
    function reloadPage() {
        window.location.href = (`${process.env.REACT_APP_INDEX}`)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const user = await response.json()
        if (response.ok) {
            localStorage.setItem("loggedUser", JSON.stringify(user))
            toast.success("Accesso eseguito con successo!", {
                position: toast.POSITION.TOP_CENTER
            });
            timeout = setTimeout(reloadPage, 3000)
        } else {
            setError("Email o password errati.")
        }
        return (
            user
        )
    }

    const clearErrorForm = () => {
        setError("")
        setFormData({
            email: "",
            password: ""
        })
    }

    const handleClose = (event) => {
        if (event.target.id === "login-box") onClose()
    }

    if (!open) {
        return null
    }

    return (
        <div
            id='login-box'
            className='fixed inset-0 w-[100%] bg-gray-400 bg-opacity-25 backdrop-blur-md p-0 m-0 flex flex-wrap justify-center items-center'
            onClick={handleClose}>

            <div
                className='login-container flex flex-col justify-between gap-10 p-2 pt-1 w] rounded-xl bg-white'
            >
                <div className='login-close flex justify-between px-2 py-0'>
                    <h3 className='login-box-title h-12 mt-[1.4%] font-light text-2xl'>Accedi al tuo account</h3>
                    <p
                        className='close-modal font-extrabold text-xl hover:cursor-pointer mt-[2.5%]'
                        onClick={onClose}>✖</p>
                </div>
                <form
                    className='login flex flex-col gap-5 w-[100%]'
                    onSubmit={handleSubmit}
                >
                    <div className='input-container w-[80%] flex flex-col justify-between items-between self-center gap-2 mt-2 font-semibold'>
                        <div className='email-input w-[100%] flex justify-between'>
                            <p>E-mail: </p>
                            <input className='text-sm font-normal'
                                type="email"
                                name='email'
                                onChange={handleChange}
                                value={formData.email}
                                required />
                        </div>
                        <div className='password-input w-[100%] flex justify-between'>
                            <p>Password: </p>
                            <input
                                type="password"
                                name='password'
                                className='text-sm font-normal'
                                onChange={handleChange}
                                value={formData.password}
                                required />
                        </div>
                        {
                            error &&
                            <div className='login-error-box self-center flex flex-col justify-between items-center mt-5 w-[100%]'>
                                <p className='login-error-text text-red-500 '>{error}</p>
                                <button
                                    type='reset'
                                    className='reset-login-error bg-[#eaeaea] py-1 px-2 rounded-full '
                                    onClick={clearErrorForm}
                                >
                                    Riprova
                                </button>
                            </div>
                        }
                    </div>
                    <div className='button-container flex flex-col justify-between gap-2 my-3'>
                        <button
                            type='submit'
                            className='login-button login-input font-semibold bg-green-500'>
                            Accedi
                        </button>
                        <button className='github-button login-input font-semibold bg-black text-white flex items-center'>
                            <img
                                src={gitHubLogo}
                                alt='github-logo'
                                className='login-github-logo w-[34px]' /> Accedi con GitHub
                        </button>
                        <button className='google-button login-input font-semibold bg-[#337ee0] text-white flex items-center'>
                            <img
                                src={facebookLogo}
                                alt="facebook-logo"
                                className='login-facebook-logo w-[32px]' /> Accedi con Facebook
                        </button>
                    </div>
                </form>
                <p className='self-center'>Non hai un account? <a className='create-account text-blue-400 hover:underline' href={`${process.env.REACT_APP_INDEX}/crea-account`}>Creane uno</a>.</p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginModal