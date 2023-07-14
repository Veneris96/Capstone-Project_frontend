import React from 'react'
import ".././Styles/BackToTop.css"

const BackToTop = () => {
    return (
        <a href='#header'>
            <button
                className='back-to-top w-20 h-20 m-0 fixed bottom-4 right-4 font-semibold hover:underline bg-gradient-to-tr from-purple-400 to-blue-200 rounded-full'
            >
                Torna <br />
                all' ↑<br />
                inizio
            </button></a>
    )
}

export default BackToTop