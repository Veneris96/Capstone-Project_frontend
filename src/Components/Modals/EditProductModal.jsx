import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PropagateLoader } from 'react-spinners'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const EditProductModal = ({ open, onClose, product }) => {

    let timeout;

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [productError, setProductError] = useState("")
    const [imgError, setImgError] = useState("")
    const { id } = useParams()

    const [editFormData, setEditFormData] = useState({
        name: "",
        platform: "",
        format: "",
        condition: "",
        region: "",
        genre: "",
        price: "",
        description: "",
    })

 

    const handleEditFormChange = (event) => {
        setEditFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handlefile = async (event) => {
        setFile(event.target.files[0])
    }

    const uploadFile = async (file) => {
        const fileData = new FormData()
        fileData.append("img", file)
        try {
            const response = await fetch(`${process.env.REACT_APP_CLOUD_UPLOAD_URL}`, {
                method: "POST",
                body: fileData
            })
            return await response.json()
        } catch (error) {
            if (error) toast.error("Si è verificato un errore durante l'upload dell'immagine.", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }
    
    function reloadPage() {
        window.location.href = (`${process.env.REACT_APP_INDEX}/prodotto/${id}`)
    }

    const editProductInfo = async (event) => {
        event.preventDefault()
        setLoading(true)
        if (file) {
            try {
                const uploadedFile = await uploadFile(file)
                const editProductFormData = {
                    ...editFormData,
                    img: uploadedFile.img
                }
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(editProductFormData)
                })
                setLoading(false)
                toast.success("Prodotto aggiornato con successo!", {
                    position: toast.POSITION.TOP_CENTER
                })
                timeout = setTimeout(reloadPage, 2500)
            } catch (error) {
                if (error) setProductError("Si è verificato un errore durante l'aggiunta del prodotto.")
            }
        } else {
            alert("Immagine mancante")
        }
    }

    const handleClose = (event) => {
        if (event.target.id === "edit-product-container") onClose()
    }

    if (!open) {
        return null
    }

    return (
        <div id='edit-product-container'
            onClick={handleClose}
            className='fixed inset-0 w-[100%] bg-gray-400 bg-opacity-50 backdrop-blur-none p-0 m-0 flex flex-wrap justify-center items-center'
            style={{zIndex: "10000" }}>
            <div
                className='add-product-container rounded-xl bg-white scroll-auto w-fit self-center flex flex-col justify-between items-center overflow-scroll h-[90vh]'>
                <div className='edit-title-close flex justify-between items-center w-[100%] px-5'>
                    <h3 className=' text-2xl font-semibold pb-2 pt-2 w-[100%]'>Modifica prodotto</h3>
                    <button className='close-edit-modal font-extrabold text-xl'
                        onClick={() => onClose()}>✖</button>
                </div>
                <hr className='horizontal-line border-[#eaeaea] w-[100%] mb-3' />

                <form
                    encType='multipart/form-data'
                    onSubmit={editProductInfo}
                    className='add-product-form h-min flex flex-col flex-wrap justify-evenly items-between gap-5 p-2'>
                    <div className='flex flex-wrap w-fit justify-center gap-10'>
                        <div className='add-product'>
                            <p>Nome: </p>
                            <textarea
                                required
                                onChange={handleEditFormChange}
                                placeholder={product.name}
                                name="name"
                                rows={4}
                                className='add-product-input border' type="text" />
                        </div>
                        <div className='add-product'>
                            <p>Piattaforma: </p>
                            <select
                                required
                                onChange={handleEditFormChange}
                                placeholder={product.platform}
                                name="platform"
                                className='add-product-input'>
                                <option selected hidden disabled value=""> Scegli la piattaforma</option>
                                <option value="Xbox">Microsoft: Xbox</option>
                                <option value="Xbox 360">Microsoft: Xbox 360</option>
                                <option value="Xbox One">Microsoft: Xbox One</option>
                                <option value="Xbox Series X">Microsoft: Xbox Series X</option>
                                <option value="Xbox Series S">Microsoft: Xbox Series S</option>
                                <option value="Game Boy">Nintendo: Game Boy</option>
                                <option value="Game Boy Advance">Nintendo: Game Boy Advance</option>
                                <option value="Game Boy Color">Nintendo: Game Boy Color</option>
                                <option value="GameCube">Nintendo: GameCube</option>
                                <option value="NES">Nintendo: NES</option>
                                <option value="Nintendo 3DS">Nintendo: Nintendo 3DS</option>
                                <option value="Nintendo DS">Nintendo: Nintendo DS</option>
                                <option value="Super Nintendo">Nintendo: Super Nintendo</option>
                                <option value="Nintendo Switch">Nintendo: Switch</option>
                                <option value="Wii">Nintendo: Wii</option>
                                <option value="Wii U">Nintendo: Wii U</option>
                                <option value="PlayStation">Sony: PlayStation</option>
                                <option value="PlayStation 2">Sony: PlayStation 2</option>
                                <option value="PlayStation 3">Sony: PlayStation 3</option>
                                <option value="PlayStation 4">Sony: PlayStation 4</option>
                                <option value="PlayStation 5">Sony: PlayStation 5</option>
                                <option value="PSP">Sony: PSP</option>
                                <option value="PS Vita">Sony: PS Vita</option>
                            </select>
                        </div>
                    </div>

                    {
                        loading && !productError &&
                        <PropagateLoader className='self-center py-10' color="#b595d5" />
                    }
                    {
                        !loading && productError &&
                        <p className='product-error py-10 self-center flex w-fit text-lg text-red-500 font-semibold'>{productError}</p>
                    }

                    <div className='flex flex-wrap w-fit justify-center gap-10'>
                        <div className='add-product'>
                            <p>Categoria: </p>
                            <select
                                required
                                onChange={handleEditFormChange}
                                placeholder={product.format}
                                name='format'
                                className='add-product-input' type="text">
                                <option selected hidden disabled>Scegli la categoria</option>
                                <option value="game">Gioco</option>
                                <option value="console">Console</option>
                            </select>
                        </div>
                        <div className='add-product'>
                            <p>Condizione: </p>
                            <select
                                required
                                name='condition'
                                onChange={handleEditFormChange}
                                placeholder={product.condition}
                                className='add-product-input' type="text" >
                                <option selected hidden disabled>Scegli condizione</option>
                                <option value="new">Nuovo</option>
                                <option value="used">Usato</option>
                            </select>

                        </div>
                    </div>
                    <div className='flex flex-wrap w-fit justify-center gap-10'>
                        <div className='add-product'>
                            <p>Regione: </p>
                            <select
                                required
                                name="region"
                                onChange={handleEditFormChange}
                                placeholder={product.region}
                                className='add-product-input w-[100%] rounded-xl'>
                                <option selected hidden disabled value="eur">Scegli la regione</option>
                                <option value="EUR">PAL (EUR/AU)</option>
                                <option value="USA">NTSC/U (USA)</option>
                                <option value="JAP">NTSC/J (JAP)</option>
                            </select>
                        </div>
                        <div className='add-product'>
                            <p>Genere </p>
                            <select
                                required
                                name="genre"
                                onChange={handleEditFormChange}
                                placeholder={product.genre}
                                className='add-product-input w-[100%] rounded-xl'>
                                <option selected hidden disabled value="">Scegli il genere</option>
                                <option value="Avventura">Avventura</option>
                                <option value="Azione e Avventura">Azione e Avventura</option>
                                <option value="Corsa">Corsa</option>
                                <option value="Educativo">Educativo</option>
                                <option value="FPS">FPS</option>
                                <option value="Horror">Horror</option>
                                <option value="Mix di generi">Mix di generi</option>
                                <option value="Musicale">Musicale</option>
                                <option value="Party">Party</option>
                                <option value="Platform">Platform</option>
                                <option value="Picchiaduro">Picchiaduro</option>
                                <option value="Puzzle">Puzzle</option>
                                <option value="RPG">RPG</option>
                                <option value="Simulazione di volo">Simulazione di volo</option>
                                <option value="Sportivo">Sportivo</option>
                                <option value="Strategico">Strategico</option>
                                <option value="Stealth">Stealth</option>
                                <option value="TPS">TPS</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-wrap w-fit justify-center gap-10'>
                        <div className='add-product'>
                            <p>Prezzo (€): </p>
                            <input
                                required
                                name='price'
                                onChange={handleEditFormChange}
                                placeholder={product.price}
                                className='add-product-input'
                                type="number"
                                step={0.01}
                            />
                        </div>
                        <div className='add-product'>
                            <p>Foto: </p>
                            <input
                                className='add-product-input product-img'
                                name='img'
                                onChange={handlefile}
                                type="file"
                                required />
                        </div>
                    </div>
                    <div className='self-center w-[70%] flex flex-col justify-between items-center gap-5 py-1'>
                        <div className='add-product-description flex flex-col justify-normal items-center w-[100%]'>
                            <p>Descrizione (opzionale): </p>
                            <textarea
                                name='description'
                                onChange={handleEditFormChange}
                                placeholder={product.description}
                                rows={4}
                                className='add-product-description border p-1 w-[100%]'
                                type="text" />
                        </div>
                        <div className='product-buttons-contaiener flex justify-between w-[100%]'>
                            <button
                                className='add-product-button bg-red-500'
                                type='reset'>Resetta form
                            </button>
                            <button
                                className='add-product-button bg-green-500'
                                type='submit'>Salva modifiche
                            </button>
                        </div>
                    </div>
                </form>
                <hr className='horizontal-line border-[#eaeaea] w-[100%]' />
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditProductModal