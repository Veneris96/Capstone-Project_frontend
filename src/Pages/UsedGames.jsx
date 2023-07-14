import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import UsedGamesSidebar from '../Components/UsedGamesSidebar'
import CartButton from '../Components/CartButton'
import Card from '../Components/Card'
import Footer from '../Components/Footer'
import BackToTop from '../Components/BackToTop'
import { PropagateLoader } from 'react-spinners'
import "../Styles/CardContainer.css"

const UsedGames = () => {

    const [cart, setCart] = useState([])
    const [games, setGames] = useState([])
    const [renderedGames, setRenderedGames] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(6)

    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage
    const products = renderedGames.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(renderedGames.length / productsPerPage)
    const numbers = [...Array(totalPages + 1).keys()].slice(1)

    const getUsedGames = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/usedgames/game&used`)
            const data = await response.json()
            setGames(data.products)
            setRenderedGames(data.products)
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

    const addToCart = (product) => {
        console.log("aggiungo al carrello")
        setCart([...cart, product])
    }

    useEffect(() => {
        getUsedGames()
    }, [])

    return (
        <div className='homepage flex flex-col justify-between min-h-screen'>
            <Header />
            <div className='main-container w-[100%] self-center flex flex-col justify-center '>
                <h1 className='page-title text-center text-3xl font-semibold self-center my-5 pb-5 w-[70%]'
                    style={{ borderBottom: "1px solid #eaeaea" }}>Giochi Usati & Retrogames</h1>
                <UsedGamesSidebar
                    usedGames={games}
                    setRenderedUsedGames={setRenderedGames}
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
                    {loading && !error && <PropagateLoader color="#b595d5" />}
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
                                    description={product.description}
                                />)
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

export default UsedGames