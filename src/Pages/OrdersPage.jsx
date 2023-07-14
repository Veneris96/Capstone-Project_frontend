import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import useDecodedSession from '../hooks/useDecodedSession'
import { PropagateLoader } from 'react-spinners'

const OrdersPage = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const loggedUser = useDecodedSession()

  return (
    <div className='homepage flex flex-col min-h-screen'>
      <Header />
      <h1 className='orders-title text-center text-3xl font-semibold self-center mt-10 mb-5'>I tuoi ordini</h1>
      <div className='orders-container self-center flex flex-col justify-normal items-center w-[70%] min-h-[55vh]'
        style={{borderTop: "1px solid #eaeaea", borderBottom: "1px solid #eaeaea" }}>
        {
          loggedUser && (!loggedUser.orders || loggedUser.orders === []) &&
          <p className='text-2xl font-semibold text-center mt-14'>Non sono presenti ordini</p>
        }
      </div>
      <Footer />
    </div>
  )
}

export default OrdersPage