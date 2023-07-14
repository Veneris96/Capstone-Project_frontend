import React, { useState } from 'react'
import CarouselItem from "./CarouselItem"
import "../../src/Styles/Carousel.css"

const Carousel = () => {

    const items = [
        {
            title: "Promozione sui giochi PS4",
            description: "Tanti titoli PS4 scontati del 25%!",
            img: "https://images.pushsquare.com/bb6575da9510d/best-ps4-games.large.jpg",
        },
        {
            title: "2x1 sui giochi Xbox One",
            description: "Il meno caro non lo paghi!",
            img: "https://i.ibb.co/9qrXwDk/x-one-games.png",
        },
        {
            title: "Switch OLED Zelda",
            description: "Nuovamente disponibile a soli €349!",
            img: "https://i.ibb.co/zNKxdsQ/switch-zelda.png",
        }
    ]

    const [activeIndex, setActiveIndex] = useState(0)

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= items.length) {
            newIndex = items.length - 1
        }

        setActiveIndex(newIndex)
    }

    return (
        <div
            id='carousel'
            className='carousel h-fit self-center mb-10'>
            <div
                className='inner-carousel h-[100%]'
                style={{ transform: `translate(-${activeIndex * 100}%)` }}>
                {items.map((item) => {
                    return (
                        <CarouselItem
                            item={item}
                        />
                    )
                })}
            </div>

            <div className='carousel-buttons'>
                <button
                    className='arrow back relative left-[0.55%]'
                    onClick={() => {
                        updateIndex(activeIndex - 1)
                    }}>
                    <span className={`material-symbols-outlined`}>
                        arrow_back_ios
                    </span>
                </button>
                <div className='indicators w-[112px] flex justify-between'>
                    {items.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className='indicator-button '
                                onClick={() => {
                                    updateIndex(index)
                                }}>
                                <span className={`material-symbols-outlined ${index === activeIndex ? "indicator-symbol-active" : "indicator-symbol"}`}>
                                    ●
                                </span>
                            </button>
                        )
                    })}
                </div>
                <button
                    className='arrow forward relative left-[0.55%]'
                    onClick={() => {
                        updateIndex(activeIndex + 1)
                    }}>
                    <span className={`material-symbols-outlined`}>
                        arrow_forward_ios
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Carousel