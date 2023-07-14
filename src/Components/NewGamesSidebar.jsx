import React, { useState } from 'react'
import "../../src/Styles/Sidebar.css"

const NewGamesSidebar = ({ newGames, setRenderedNewGames }) => {

    const [searchedTerm, setSearchedTerm] = useState("")

    const searchNewGames = (event) => {
        event.preventDefault()

        if (searchedTerm !== "") {
            const filteredNewGames = newGames.filter((newGame) =>
                newGame.name.toLowerCase().includes(searchedTerm.toLowerCase())
            )
            setRenderedNewGames(filteredNewGames)
        } else {
            setRenderedNewGames(newGames)
        }

    }

    const resetSearchField = () => {
        setSearchedTerm("")
        setRenderedNewGames(newGames)
    }

    return (
        <>
            <div
                id='top-bar'
                className='top-bar w-[100vh] mt-5 mb-5 py-2 flex justify-center self-center rounded-xl bg-blue-200 bg-opacity-70'>
                <form
                    onSubmit={searchNewGames}
                    className='form flex flex-wrap justify-evenly gap-2 items-center'
                    action="">
                    <div className='flex flex-wrap justify-center items-center gap-5'>
                        <div className='searchbar w-[320px]'>
                            <p className='pl-1'>Cerca giochi nuovi:</p>
                            <input
                                name='name'
                                value={searchedTerm}
                                onChange={(event) => { event.target.value === "" ? setRenderedNewGames(newGames) : setSearchedTerm(event.target.value) }}
                                placeholder='Cerca . . .'
                                type='search'
                                className='search-bar-text w-[100%]'
                            />
                        </div>
                        <div className='form-buttons-filter flex justify-evenly items-center gap-5'>
                            <button
                                onClick={resetSearchField}
                                type='reset'
                                className='rest-button rounded-xl bg-violet-300'
                            >Resetta</button>
                            <button
                                type='submit'
                                className='search-button rounded-xl bg-green-500 hover:bg-green-400'>
                                Cerca</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewGamesSidebar