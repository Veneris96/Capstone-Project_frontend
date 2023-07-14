import React from 'react'
import facebookLogo from "../icons/icons8-facebook.svg"
import instagramLogo from "../icons/icons8-instagram.svg"
import tikTokLogo from "../icons/icons8-tic-toc.svg"
import payPalLogo from "../icons/icons8-paypal.svg"
import masterCardLogo from "../icons/icons8-mastercard.svg"
import maestroLogo from "../icons/icons8-maestro.svg"
import visaLogo from "../icons/icons8-visa.svg"
import "../../src/Styles/Footer.css"

const Footer = () => {
    return (
        <footer className='footer h-fit top-4 w-auto flex flex-col flex-wrap justify-between bg-gradient-to-tr from-purple-400 to-blue-200'>
            <div className='footer-links mt-5 px-[5%] flex flex-wrap justify-evenly'>
                <div>
                    <ul>
                        <a href="https://www.facebook.com/"><li><img src={facebookLogo} /></li></a>
                        <a href="https://www.instagram.com/"><li><img src={instagramLogo} alt="" /></li></a>
                        <a href="https://www.tiktok.com/login"><li><img src={tikTokLogo} alt="" /></li></a>
                    </ul>
                </div>
                <div>
                    <ul  className='col-2 flex flex-col gap-2 pt-1'>
                        <a href=""><li>Chi siamo</li></a>
                        <a href=""><li>Contattaci</li></a>
                        <a href=""><li>FAQ</li></a>
                    </ul>
                </div>
                <div>
                    <ul  className='col-3 flex flex-col gap-2 pt-1'>
                        <p>Seraphim srl, Via F. Mangini 74, 37020, Verona, VR</p>
                        <p>P.IVA & CF: 89765432145</p>
                        <p></p>
                    </ul>
                    <div className='payment-methods flex flex-wrap gap-6'>
                        <img src={payPalLogo} alt="paypal-logo" />
                        <img src={masterCardLogo} alt="mastercard-logo" />
                        <img src={maestroLogo} alt="maestro-logo" />
                        <img src={visaLogo} alt="visa-logo" />
                    </div>
                </div>
            </div>
            <p className='copyright self-center my-3 px-[4.3%]'>Seraphim Soft. srl © Matteo Devicienti, 2023. Per utilizzo a scopo strettamente didattico/dimostrativo.</p>
        </footer>
    )
}

export default Footer