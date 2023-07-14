import React from 'react'
import { useNavigate } from 'react-router-dom'
import facebookLogo from "../../icons/icons8-facebook.svg"
import { ToastContainer, toast } from "react-toastify"
import "../../Styles/LogOutModal.css"

const LogOutModal = ({ open, onClose }) => {

    let timeout;

    const navigate = useNavigate()

    const handleClose = (event) => {
        if (event.target.id === "logout-box") onClose()
    }
    if (!open) {
        return null
    }

    function reloadPage() {
        window.location.href = (`${process.env.REACT_APP_INDEX}`)
    }

    const logout = () => {
        localStorage.removeItem("loggedUser")
        toast.success("Logout eseguito con successo!", {
            position: toast.POSITION.TOP_CENTER
        });
        timeout= setTimeout(reloadPage, 3000)
    }

    return (
        <div
            id='logout-box'
            className='fixed inset-0 w-[100%] bg-gray-400 bg-opacity-25 backdrop-blur-md p-0 m-0 flex flex-wrap justify-center'
            onClick={handleClose}>

            <div className='login-container self-center flex flex-col h-auto p-2 pt-1 rounded-xl bg-white'
            >
                <div className='login-close flex justify-between items-center px-2 py-0'>
                    <h3 className='login-box-title h-12 mt-[1.4%] font-light text-2xl'>Esci dall'account</h3>
                    <p
                        className='close-modal font-extrabold text-xl hover:cursor-pointer '
                        onClick={onClose}>✖</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-2xl font-medium py-10'>Vuoi uscire dall'account?</p>
                    <div className='flex gap-5 mb-5'>
                        <button
                            className='logout-button bg-green-500'
                            onClick={logout}>Sì</button>
                        <button
                            className='logout-button bg-red-500'
                            onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LogOutModal