import React, { useState } from 'react'
import LoginModal from './Modals/LoginModal'
import UserDropDown from './DropdownMenu'
import useDecodedSession from '../hooks/useDecodedSession'
import gamesMarketLogo from "../icons/gamemarket_logo_4.svg"
import CartButton from './CartButton'
import "../../src/Styles/Header.css"


const Header = () => {

  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const closeLoginModal = () => setLoginModalOpen(false)

  const loggedUser = useDecodedSession()

  return (
    <div className='header-container'>
      <header
        id='header'
        className='header w-[100%] h-[140px] flex justify-between items-center px-[20%] bg-gradient-to-tr from-purple-400 to-blue-200'>
        <a className='gamesmarket-logo' 
        href={process.env.REACT_APP_INDEX}>
          <img src={gamesMarketLogo} className='w-[250px] hover:scale-[100.5%] transition-transform' alt="" />
        </a>
        <div 
        id='user-panel'
        className='user-panel'>
          {!loggedUser &&
            <div className='account-line self-end w-fit flex flex-wrap items-start'>
              <a className='mt-[2.2%]'>
                <p
                  className='login-button hover:underline hover:cursor-pointer h-min'
                  onClick={() => setLoginModalOpen(true)}>
                  Accedi
                </p></a>
              <span className='separate mt-[2.2%] px-1'> / </span>
              <a
                className='mt-[2.2%]'
                href={`${process.env.REACT_APP_INDEX}/crea-account`}>
                <p
                  className='signup-button h-min hover:underline hover:cursor-pointer'>
                  Registrati
                </p></a>
            </div>
          }
          {
            loggedUser &&
            <p>Ciao {loggedUser.name}!</p>
          }
          {
            loggedUser &&
            <UserDropDown />
          }
          <CartButton />
        </div>
      </header>

      <nav className='navbar flex justify-center'>
        <ul className='nav-links top-20 w-auto mt-5 px-4 py-2 flex flex-wrap justify-center gap-3'>
          <a href={process.env.REACT_APP_INDEX}><li className='home-link font-bold '>Homepage</li></a>|
          <a href={`${process.env.REACT_APP_INDEX}/giochi-nuovi`}><li>Giochi Nuovi</li></a><span>|</span>
          <a href={`${process.env.REACT_APP_INDEX}/giochi-usati`}><li>Giochi Usati</li></a>|
          <a href={`${process.env.REACT_APP_INDEX}/console-nuove`}><li>Console Nuove</li></a>|
          <a href={`${process.env.REACT_APP_INDEX}/console-usate`}><li>Console Usate</li></a>
        </ul>

      </nav>
      <LoginModal open={loginModalOpen} onClose={closeLoginModal} />
    </div>

  )
}

export default Header