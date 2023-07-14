import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { ShopContext } from '../Context/ShopContextProvider'
import ".././Styles/Card.css"

const Card = ({ id, name, platform, region, format, img, condition, price }) => {

    const { addToCart, cartItems } = useContext(ShopContext)

    const cartItemsAmount = cartItems[id]

    return (
        <div
            id='single-card-container'
            className='single-card-container my-5 mx-2 card flex flex-col justify-between p-2'>
            <Link to={`/prodotto/${id}`}
                className='flex flex-col gap-2'>
                <img className='product-image self-center' src={img} alt="" style={{ objectFit: "cover" }} />
                <div>
                    <h3 className='product-name font-bold text-xl'>{name}</h3>
                </div>
                {
                    format && format === "game" &&
                    <div className='product-platform font-semibold'>
                        <p>{platform}</p>
                    </div>
                }
                <div className='product-region'>
                    <p>Versione: {region}</p>
                </div>
                <div className='flex justify-between items-center mt-5'>
                    {
                        condition && condition === "new" &&
                        <p>Nuovo</p>
                    }
                    {
                        condition && condition === "used" &&
                        <p>Usato</p>
                    }
                    <b className='product price mb-5 self-end text-2xl mt-5'>€{price}</b>
                </div>
            </Link>
            <button
                onClick={() =>  addToCart(id)}
                className='add-to-cart self-center flex justify-between items-center font-medium'>Aggiungi al carrello 
                {
                    cartItemsAmount > 0 && <>({cartItemsAmount})</>
                }
                <span className="material-symbols-outlined pl-1">
                    add_shopping_cart
                </span>
            </button>
        </div>
    )
}

export default Card