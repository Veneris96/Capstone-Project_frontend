import { Menu } from '@headlessui/react'
import { Link } from 'react-router-dom'
import LogOutModal from './Modals/LogOutModal'
import logout from "../icons/logout.svg"
import { useState } from 'react'
import "../../src/Styles/Dropdown.css"

const UserDropDown = () => {

  const [logoutModalOpen, setLogoutModalOpen] = useState(false)
  const closeLogoutModal = () => setLogoutModalOpen(false)

  return (
    <div className=''>
      <Menu id='dropdown-menu' as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="account-button inline-flex justify-between w-max px-[7%] py-[5%] mr-3 mt-[3%]  rounded-xl bg-black bg-opacity-20 text-sm font-medium text-white">
            Account ▾
          </Menu.Button>
        </div>
        <Menu.Items className="absolute center-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link to={`${process.env.REACT_APP_INDEX}/user-dashboard`}>
                  <button
                    className={`${active ? 'bg-violet-300 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                  >
                    <span className="material-symbols-outlined">
                      person
                    </span>
                    Dashboard utente
                  </button>
                </Link>
              )}
            </Menu.Item>
            <div className="px-1 py-1">
            </div>
            <Menu.Item>
              {({ active }) => (
                <Link to={`${process.env.REACT_APP_INDEX}/ordini`}>
                  <button
                    className={`${active ? 'bg-violet-300 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                  >
                    🛒 Ordini
                  </button>
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group w-full flex items-center rounded-xl px-2 py-2 text-sm`}
                  onClick={() => setLogoutModalOpen(true)}>
                  <img
                    className='logout-img w-[18px] mr-1'
                    src={logout}
                    alt="logout-icon" />
                  <b>Esci</b>

                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
      <LogOutModal open={logoutModalOpen} onClose={closeLogoutModal} />
    </div>
  )
}

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>

  )
}

export default UserDropDown
