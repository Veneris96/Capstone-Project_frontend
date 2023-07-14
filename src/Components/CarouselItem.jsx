import React from 'react'
import "../../src/Styles/CarouselItem.css"
import { nanoid } from 'nanoid'

const CarouselItem = ({ item, key }) => {
    return (
        <div
        key={nanoid()} 
        className='carousel-item flex flex-col flex-wrap justify-center items-center'>
            <img
                style={{objectFit: "cover"}}
                className='carousel-img'
                src={item.img}
                alt="" />
            <div className='carousel-text w-full h-fit relative top-[41.5%] right-[100%] px-1 bg-black bg-opacity-60 text-white'>
                <p className='carousel-item-title text-xl font-semibold'>{item.title}</p>
                <p className='carousel-item-description flex flex-wrap'>{item.description}</p>
            </div>
        </div>
    )
}

export default CarouselItem