import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Carousel from '../Components/Carousel'
import HomepageSidebar from '../Components/HomepageSearchbar'
import CartButton from '../Components/CartButton'
import Card from '../Components/Card'
import BackToTop from '../Components/BackToTop'
import Footer from '../Components/Footer'
import { PropagateLoader } from "react-spinners"
import "../Styles/CardContainer.css"

const Homepage = () => {

    const [items, setItems] = useState([])
    const [renderedProducts, setRenderedProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(12)

    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage
    const products = renderedProducts.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(renderedProducts.length / productsPerPage)
    const numbers = [...Array(totalPages + 1).keys()].slice(1)


    const getProducts = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`, {
                method: "GET"
            })
            const data = await response.json()
            setItems(data.products)
            setRenderedProducts(data.products)
            setLoading(false)
        } catch (error) {
            if (error) setError("Si è verificatro un errore, riprova più tardi.")
        }
    }

    const changeCurrentPage = (id) => {
        setCurrentPage(id)
    }

    const prevPage = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className='homepage flex flex-col justify-between min-h-screen'>
            <Header />
            <div className='main-container w-[100%] self-center flex flex-col justify-center items-center'>
                <h1 className='page-title text-center text-3xl font-semibold self-center mt-10 mb-5 pb-5 w-[70%]'
                    style={{ borderBottom: "1px solid #eaeaea" }}>Ultimi arrivi</h1>
                <Carousel />
                <HomepageSidebar
                    products={items}
                    setRenderedProducts={setRenderedProducts}
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
                <div className='card-container self-center flex flex-wrap justify-center items-start'>

                    {loading && <PropagateLoader className='my-14' color="#b595d5" />}
                    {!loading && error && <p>{error}</p>}
                    {!loading && !error && products && products.map((product) => {
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
                                condition={product.condition}
                                price={product.price}
                                description={product.description}
                            />
                        )
                    })}
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

export default Homepage
