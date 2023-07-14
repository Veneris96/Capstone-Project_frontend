import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import NewConsoleSidebar from '../Components/NewConsoleSidebar'
import CartButton from '../Components/CartButton'
import Card from '../Components/Card'
import Footer from '../Components/Footer'
import BackToTop from '../Components/BackToTop'
import { PropagateLoader } from 'react-spinners'
import "../Styles/CardContainer.css"

const NewConsoles = () => {

    const [cart, setCart] = useState([])
    const [consoles, setConsoles] = useState([])
    const [renderedConsoles, setRenderedConsoles] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(6)

    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage
    const products = renderedConsoles.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(renderedConsoles.length / productsPerPage)
    const numbers = [...Array(totalPages).keys()].slice(1)

    const getNewConsoles = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/newconsoles/console&new`)
            const data = await response.json()
            setConsoles(data.products)
            setRenderedConsoles(data.products)
            setLoading(false)
        } catch (error) {
            if (error) setError("Si è verificato un errore, riprova più tardi.")
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id)
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }


    useEffect(() => {
        getNewConsoles()
    }, [])

    return (
        <div className='homepage flex flex-col justify-between'>
            <Header />
            <div className='main-container w-[100%] self-center flex flex-col justify-center min-h-screen '>
                <h1 className='page-title text-center text-3xl font-semibold self-center my-5 pb-5 w-[70%]'
                    style={{ borderBottom: "1px solid #eaeaea" }}>Console Nuove</h1>
                <NewConsoleSidebar
                    setRenderedNewConsoles={setRenderedConsoles}
                    newConsoles={consoles}
                />
                <div className='cart-pagination flex flex-col flex-wrap justify-center'>
                    <div className='pagination-container flex flex-col'>
                        <div className='products-per-page self-center flex'>
                            <p>Prodotti per pagina: </p>
                            <select
                                className='select w-16 ml-2 pl-2 rounded-[50px]'
                                style={{ border: "1px solid lightgray" }}
                                name="pages"
                                onChange={
                                    (event) => [setProductsPerPage(event.target.value), setCurrentPage(1)]
                                }>
                                <option value={12}>12</option>
                                <option value={18}>18</option>
                                <option value={24}>24</option>
                            </select>
                        </div >
                        <div className='paginate mt-5 flex flex-col items-center justify-center'>
                            <p className='text-lg'>Pagina: {currentPage} / {totalPages}</p>
                            <ul className='pagination mt-2 flex justify-center gap-20 font-bold'>
                                <li className='page-item '>
                                    <a
                                        onClick={prevPage}

                                        href="#">Indietro
                                    </a>
                                </li>
                                {
                                    numbers && numbers.map((number, i) => {
                                        <li className={`page-item ${currentPage === number ? "active" : ""}`}
                                            key={i}>
                                            <a href="#"
                                                onClick={() => changeCurrentPage(number)}
                                            >{number}</a>

                                        </li>
                                    })
                                }
                                <li className='page-item '>
                                    <a
                                        onClick={nextPage}

                                        href="#">Avanti
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className='card-container self-center flex flex-wrap justify-center'>
                    {loading && !error && <PropagateLoader color='#b595d5' />}
                    {!loading && error && <p>{error}</p>}
                    {
                        !loading && !error && products && products.map((product) => {
                            return (
                                <Card
                                    format={product.format}
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    maker={product.maker}
                                    platform={product.platform}
                                    region={product.region}
                                    genre={product.genre}
                                    img={product.img}
                                    price={product.price}
                                    description={product.description} />
                            )
                        })
                    }
                </div>
            </div>

            <div className='paginate mt-5 flex flex-col items-center justify-center'>
                <p className='text-lg'>Pagina: {currentPage} / {totalPages}</p>
                <ul className='pagination mt-2 flex justify-center gap-20 font-bold'>
                    <li className='page-item '>
                        <a
                            onClick={prevPage}

                            href="#">Indietro
                        </a>
                    </li>
                    {
                        numbers && numbers.map((number, i) => {
                            <li className={`page-item ${currentPage === number ? "active" : ""}`}
                                key={i}>
                                <a href="#"
                                    onClick={() => changeCurrentPage(number)}
                                >{number}</a>

                            </li>
                        })
                    }
                    <li className='page-item '>
                        <a
                            onClick={nextPage}

                            href="#">Avanti
                        </a>
                    </li>
                </ul>
            </div>

            <BackToTop />
            <Footer />
        </div>
    )
}

export default NewConsoles