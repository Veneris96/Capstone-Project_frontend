import React from 'react'

const CartItem = (PRODUCTS) => {
  return (
    <div className='cartItem'>
        <p>{PRODUCTS.name}</p>
    </div>
  )
}

export default CartItem