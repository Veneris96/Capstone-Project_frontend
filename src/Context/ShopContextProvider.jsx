import React, { createContext, useState } from 'react'

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {

    const defaultCart = () => {
        const cart = {}
        for (let i = 1; i < props.PRODUCTS.length + 1; i++) {
            cart[i] = 0;
        }
        return cart;
    }

    const [cartItems, setCartItems] = useState(defaultCart())

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const contextValue = { cartItems, addToCart, removeFromCart }

    return (
        <ShopContext.Provider
            value={contextValue}
        >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider