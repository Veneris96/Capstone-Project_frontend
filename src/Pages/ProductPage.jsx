import React, { useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Components/Header'
import { ShopContext } from '../Context/ShopContextProvider'
import Footer from '../Components/Footer'
import { PropagateLoader } from 'react-spinners'
import useDecodedSession from '../hooks/useDecodedSession'
import EditProductModal from '../Components/Modals/EditProductModal'
import DeleteProductModal from '../Components/Modals/DeleteProductModal'
import "../Styles/ProductPage.css"

const ProductPage = () => {

    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { addToCart, cartItems } = useContext(ShopContext)

    const [editModalOpen, setEditModalOpen] = useState(false)
    const closeEditModal = () => setEditModalOpen(false)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const closeDeleteModal = () => setDeleteModalOpen(false)

    const { id } = useParams()

    const loggedUser = useDecodedSession()

    const productDetails = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/${id}`)
            const data = await response.json()
            setDetails(data.product)
            setLoading(false)
        } catch (error) {
            if (error) setError("Si è verificato un errore, riprova più tardi. ")
        }
    }

    useEffect(() => {
        productDetails()
    }, [])

    return (
        <div className='homepage flex flex-col justify-between min-h-screen'>
            <Header />
            <div className='flex w-[315px] mt-2 self-center justify-end'>
            </div>
            {loading && <PropagateLoader className='self-center mt-14' color="#b595d5" />}
            {!loading && error && <p className='self-center'>{error}</p>}
            {
                !loading && !error && details &&
                <div className='main-container product-container flex flex-col flex-wrap items-center gap-5'>

                    <div className='product-img-container flex flex-col self-center'>
                        <img className='product-img w-[315px] max-w-[400px] self-center mt-5' src={details.img} alt="immagine prodotto" />
                        {
                            loggedUser && loggedUser.role === "admin" &&
                            <div className='delete-edit-container flex self-center justify-evenly mt-5 w-[100%]'>
                                <button
                                    onClick={() => setEditModalOpen(true)}
                                    className=' flex justify-center items-center hover:bg-green-500'>
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                    Modifica
                                </button>
                                <button
                                    onClick={() => setDeleteModalOpen(true)}
                                    className=' flex justify-center items-center hover:bg-red-500'>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                    Elimina
                                </button>
                            </div>
                        }
                    </div>

                    <div className='name-container flex flex-col text-center flex-wrap justify-center items-center'>
                        <h3 className='product-name text-3xl self-center flex justify-center w-[60%]'>{details.name}</h3>
                        {
                            details.format && details.format === "game" &&
                            <p className='product-platform text-lg text-center'>{details.platform}</p>
                        }
                        <p className="product-region text-lg text-center font-light ">Versione: {details.region}</p>
                    </div>
                    <div className='condition-container self-center text-center'>
                        <p className='product-price text-2xl font-semibold'>€{details.price}</p>
                        {
                            details.condition && details.condition === "new" &&
                            <p className='self-center '>Nuovo</p>
                        }
                        {
                            details.condition && details.condition === "used" &&
                            <p className='self-center'>Usato</p>
                        }
                    </div>
                    <button
                        onClick={() => addToCart(details.id)}
                        className='product-page-cart hover:bg-[#9ec7fa] py-3 px-5 self-center flex justify-between items-center font-medium mb-5 w-'>Aggiungi al carrello
                        <span className="material-symbols-outlined pl-1">
                            add_shopping_cart
                        </span>
                    </button>
                    {
                        details.description && details.description !== "" &&
                        <div className='product-description flex flex-col items-center gap-4 pb-5 w-[100vh]'>
                            <hr className='w-[100%]' />
                            <h3 className='description-title text-center text-2xl font-semibold'>Informazioni aggiuntive</h3>
                            <p className='description-body flex justify-center w-[70%] self-center '>{details.description}</p>
                        </div>
                    }
                    <p className='product.id text-xs font-normal pb-3'>ID: {details._id}</p>
                </div>
            }
            <EditProductModal
                open={editModalOpen}
                onClose={closeEditModal}
                product={details && details} />

            <DeleteProductModal
                open={deleteModalOpen}
                onClose={closeDeleteModal}
                product={details}
                id={id} />
            <Footer />
        </div>
    )
}

export default ProductPage