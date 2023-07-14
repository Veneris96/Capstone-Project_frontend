import React, { useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const DeleteUserModal = ({ open, onClose, id }) => {

    let timeout;

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleClose = (event) => {
        if (event.target.id === "delete-product-box") onClose()
    }

    if (!open) {
        return null
    }

    function reloadPage() {
        window.location.href = (`${process.env.REACT_APP_INDEX}`)
    }

    const deleteUser = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            })
            setLoading(false)
            localStorage.removeItem("loggedUser")
            toast.success("Account eliminato con successo!", {
                position: toast.POSITION.TOP_CENTER
            })
            timeout = setTimeout(reloadPage, 3000)
        } catch (error) {
            if (error) setError("Si è verificato un errore.")
        }
    }

    return (
        <div
            id='delete-product-box'
            className='fixed inset-0 w-[100%] bg-gray-400 bg-opacity-25 backdrop-blur-md p-0 m-0 flex flex-wrap justify-center'
            style={{ zIndex: "1000" }}
            onClick={handleClose}>

            <form
                onSubmit={deleteUser}
                className='delete-container w-[50vh] self-center flex flex-col h-auto p-2 pt-1 rounded-xl bg-white'
            >
                <div className='login-close flex justify-between items-center px-2 py-0'>
                    <h3 className='login-box-title h-12 mt-[1.4%] font-light text-2xl'>Elimina Account</h3>
                    <button
                        className='close-modal font-extrabold text-xl '
                        onClick={onClose}>✖</button>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-2xl text-center font-medium py-10'>Vuoi davvero eliminare l'account?</p>
                    {loading && !error &&
                        <p className='deletion-loading pb-10'><PropagateLoader color='#b595d5' /></p>
                    }
                    {!loading && error &&
                        <p className='deletion-error text-lg font-semibold text-red-500 pb-10'>{error}</p>
                    }
                    <div className='pb-10'>
                    </div>
                    <div className='flex gap-5 mb-5'>
                        <button
                            className='logout-button bg-green-500'
                            type='submit'
                        >Sì</button>
                        <button
                            className='logout-button bg-red-500'
                            onClick={onClose}>No</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default DeleteUserModal