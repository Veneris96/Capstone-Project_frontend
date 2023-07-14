import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Header.css"

const CartButton = () => {

    const [itemsInCart, setItemsInCart] = useState(0)

    return (
        <div className='cart-button-new self-end'>
            <Link to={`${process.env.REACT_APP_INDEX}/checkout`}>
                <button
                    className='cart-button w-fit flex items-center mt-2 px-2 py-1 self-end'
                >Carrello <span className="material-symbols-outlined pl-1">
                        shopping_cart
                    </span>
                    ({itemsInCart})
                </button>
            </Link>
        </div>

    )
}

export default CartButton