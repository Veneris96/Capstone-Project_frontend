import React, { useState, useContext } from 'react'
import Header from '../Components/Header'
import Footer from "../Components/Footer"
import CartItem from '../Components/CartItem'
import { ShopContext } from '../Context/ShopContextProvider'
import { PropagateLoader } from 'react-spinners'
import "../Styles/PaymentPage.css"

const PaymentPage = ({ PRODUCTS }) => {

  const shipping = 6.50
  const products = PRODUCTS
  const { cartItems } = useContext(ShopContext)
  const [subtotal, setSubtotal] = useState(0)
  const total = subtotal + shipping

  return (
    <div className='homepage flex flex-col justify-between min-h-screen'>
      <Header />
      <h1 className='page-title text-center text-3xl font-semibold self-center mt-10 pb-5 w-[70%]'
        style={{ borderBottom: "1px solid #eaeaea" }}>Checkout
      </h1>
      <div className='checkout-container flex self-center px-5 py-1'>

        {
          total && total <= 6.5 &&
          <p className='empty-cart self-center text-2xl font-semibold'> Il carrello è vuoto.</p>
        }

        {
          products && products.map((product) => {
            if (cartItems[product.id] !== 0)
              return (
                <CartItem />
              )
          })
        }
      </div>
      <div className='total-container flex flex-col justify-between self-center px-5 py-1 w-[40vh] '>
        <div className='flex flex-wrap justify-between'>
          <p>Subtotale: </p>
          <b>{subtotal}</b>
        </div>
        <div className='shipping-cost flex justify-between'>
          <p>Spese di spedizione: </p>
          <b> €{shipping} =</b>
        </div>
        <div className='flex justify-between'>
          <b>Totale: </b>
          <b>{total}</b>
        </div>
        <div className='flex justify-end gap-2'>
          {
            total && total > 6.5 &&
            <>
              <button className='bg-red-500'>Svuota il carrello</button>
              <button className='bg-green-500'>Procedi al pagamento</button>
            </>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PaymentPage