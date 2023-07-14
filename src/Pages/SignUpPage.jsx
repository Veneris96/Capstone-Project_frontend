import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { PropagateLoader } from 'react-spinners'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../../src/Styles/SignUp.css"

const SignUpPage = () => {

    let timeout;

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        address: "",
        city: "",
        province: "",
        cap: "",
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    function reloadPage() {
        window.location.href = (`${process.env.REACT_APP_INDEX}`)
    }

    const submitNewUser = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/new`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                setLoading(false)
                toast.success("Account creato correttamente! Effettua l'accesso per accedere al tuo profilo.", {
                    position: toast.POSITION.TOP_CENTER
                })
                timeout = setTimeout(reloadPage, 3000)
            }
        } catch (error) {
            if (error) setError("Si è verificato un errore")
        }
    }

    return (
        <div className='homepage flex flex-col justify-between'>
            <Header />
            <h1 className='page-title text-center text-3xl font-semibold self-center mt-10 pb-5 w-[100%]'>Crea un nuovo account</h1>
            <hr className='self-center w-[40%] bg-[#eaeaea]' />

            {!loading && error &&
                <p className='post-error text-red-500 pt-8 text-[16pt] font-semibold self-center'>Si è verificato un errore</p>
            }

            <form
                onSubmit={submitNewUser}
                className='signup-form flex flex-col self-center flex-wrap justify-evenly items-center gap-12 p-9 w-fit'>

                <div className='name-surname flex flex-wrap w-[100%] justify-between gap-20'>
                    <div className='name-input flex flex-col w-min flex-wrap'>
                        <p>Nome: </p>
                        <input
                            onChange={handleChange}
                            value={formData.name}
                            required
                            name="name"
                            pattern="^[A-Za-z0-9]{3,16}$"
                            min={3}
                            max={32}
                            type="text" />
                        <span className='error-message'>Nome di almeno 3 e massimo 32 caratteri </span>

                    </div>
                    <div className='surname flex flex-col flex-wrap w-min'>
                        <p>Cognome: </p>
                        <input
                            onChange={handleChange}
                            value={formData.surname}
                            required
                            name='surname'
                            min={3}
                            max={32}
                            pattern="^[A-Za-z0-9]{3,32}$"
                            type="text" />
                        <span className='error-message'>Cognome di almeno 3 e massimo 32 caratteri </span>
                    </div>
                </div>


                <div className='address-city flex flex-wrap w-[100%] justify-between'>
                    <div className='address flex flex-col flex-wrap w-min'>
                        <p>Indirizzo: </p>
                        <input
                            onChange={handleChange}
                            value={formData.address}
                            required
                            name='address'
                            min={5}
                            max={32}
                            type="text" />
                        <span className='error-message'>L'indirizzo deve essere valido</span>
                    </div>
                    <div className='city flex flex-col flex-wrap self-end w-min'>
                        <p>Città: </p>
                        <input
                            onChange={handleChange}
                            value={formData.city}
                            required
                            name='city'
                            max={32}
                            type="text" />
                        <span className='error-message'>Città o comune devono essere validi</span>
                    </div>
                </div>

                {
                    loading && !error &&
                    <PropagateLoader className='py-5 self-center' color="#b595d5" />
                }

                <div className='province-cap flex flex-wrap w-[100%] justify-between'>
                    <div className='province flex flex-col flex-wrap w-min'>
                        <p>Provincia: </p>
                        <select
                            required
                            onChange={handleChange}
                            value={formData.province}
                            className='province-select'
                            name="province"
                        >
                            <option selected hidden disabled value="">Seleziona Provincia</option>
                            <option value="AG">AGRIGENTO</option>
                            <option value="AL">ALESSANDRIA</option>
                            <option value="AN">ANCONA</option>
                            <option value="AO">AOSTA</option>
                            <option value="AR">AREZZO</option>
                            <option value="AP">ASCOLI PICENO</option>
                            <option value="AT">ASTI</option>
                            <option value="AV">AVELLINO</option>
                            <option value="BA">BARI</option>
                            <option value="BT">BARLETTA-ANDRIA-TRANI</option>
                            <option value="BL">BELLUNO</option>
                            <option value="BN">BENEVENTO</option>
                            <option value="BG">BERGAMO</option>
                            <option value="BI">BIELLA</option>
                            <option value="BO">BOLOGNA</option>
                            <option value="BZ">BOLZANO</option>
                            <option value="BS">BRESCIA</option>
                            <option value="BR">BRINDISI</option>
                            <option value="CA">CAGLIARI</option>
                            <option value="CL">CALTANISSETTA</option>
                            <option value="CB">CAMPOBASSO</option>
                            <option value="CI">CARBONIA-IGLESIAS</option>
                            <option value="CE">CASERTA</option>
                            <option value="CT">CATANIA</option>
                            <option value="CZ">CATANZARO</option>
                            <option value="CH">CHIETI</option>
                            <option value="CO">COMO</option>
                            <option value="CS">COSENZA</option>
                            <option value="CR">CREMONA</option>
                            <option value="KR">CROTONE</option>
                            <option value="CN">CUNEO</option>
                            <option value="EN">ENNA</option>
                            <option value="FM">FERMO</option>
                            <option value="FE">FERRARA</option>
                            <option value="FI">FIRENZE</option>
                            <option value="FG">FOGGIA</option>
                            <option value="FC">FORLÌ-CESENA</option>
                            <option value="FR">FROSINONE</option>
                            <option value="GE">GENOVA</option>
                            <option value="GO">GORIZIA</option>
                            <option value="GR">GROSSETO</option>
                            <option value="IM">IMPERIA</option>
                            <option value="IS">ISERNIA</option>
                            <option value="SP">LA SPEZIA</option>
                            <option value="AQ">L'AQUILA</option>
                            <option value="LT">LATINA</option>
                            <option value="LE">LECCE</option>
                            <option value="LC">LECCO</option>
                            <option value="LI">LIVORNO</option>
                            <option value="LO">LODI</option>
                            <option value="LU">LUCCA</option>
                            <option value="MC">MACERATA</option>
                            <option value="MN">MANTOVA</option>
                            <option value="MS">MASSA-CARRARA</option>
                            <option value="MT">MATERA</option>
                            <option value="VS">MEDIO CAMPIDANO</option>
                            <option value="ME">MESSINA</option>
                            <option value="MI">MILANO</option>
                            <option value="MO">MODENA</option>
                            <option value="MB">MONZA E BRIANZA</option>
                            <option value="NA">NAPOLI</option>
                            <option value="NO">NOVARA</option>
                            <option value="NU">NUORO</option>
                            <option value="OG">OGLIASTRA</option>
                            <option value="OT">OLBIA-TEMPIO</option>
                            <option value="OR">ORISTANO</option>
                            <option value="PD">PADOVA</option>
                            <option value="PA">PALERMO</option>
                            <option value="PR">PARMA</option>
                            <option value="PV">PAVIA</option>
                            <option value="PG">PERUGIA</option>
                            <option value="PU">PESARO E URBINO</option>
                            <option value="PE">PESCARA</option>
                            <option value="PC">PIACENZA</option>
                            <option value="PI">PISA</option>
                            <option value="PT">PISTOIA</option>
                            <option value="PN">PORDENONE</option>
                            <option value="PZ">POTENZA</option>
                            <option value="PO">PRATO</option>
                            <option value="RG">RAGUSA</option>
                            <option value="RA">RAVENNA</option>
                            <option value="RC">REGGIO CALABRIA</option>
                            <option value="RE">REGGIO EMILIA</option>
                            <option value="RI">RIETI</option>
                            <option value="RN">RIMINI</option>
                            <option value="RM">ROMA</option>
                            <option value="RO">ROVIGO</option>
                            <option value="SA">SALERNO</option>
                            <option value="SS">SASSARI</option>
                            <option value="SV">SAVONA</option>
                            <option value="SI">SIENA</option>
                            <option value="SR">SIRACUSA</option>
                            <option value="SO">SONDRIO</option>
                            <option value="TA">TARANTO</option>
                            <option value="TE">TERAMO</option>
                            <option value="TR">TERNI</option>
                            <option value="TO">TORINO</option>
                            <option value="TP">TRAPANI</option>
                            <option value="TN">TRENTO</option>
                            <option value="TV">TREVISO</option>
                            <option value="TS">TRIESTE</option>
                            <option value="UD">UDINE</option>
                            <option value="VA">VARESE</option>
                            <option value="VE">VENEZIA</option>
                            <option value="VB">VERBANO-CUSIO-OSSOLA</option>
                            <option value="VC">VERCELLI</option>
                            <option value="VR">VERONA</option>
                            <option value="VV">VIBO VALENTIA</option>
                            <option value="VI">VICENZA</option>
                            <option value="VT">VITERBO</option>
                        </select>
                        <span className='error-message'>Seleziona la provincia</span>
                    </div>
                    <div className='cap flex flex-col flex-wrap w-min'>
                        <p>CAP: </p>
                        <input
                            required
                            onChange={handleChange}
                            value={formData.cap}
                            min={5}
                            name='cap'
                            type="number" />
                        <span className='error-message'>Il CAP deve essere di 5 cifre</span>
                    </div>

                </div>

                <div className='email-password flex flex-wrap w-[100%] justify-between'>
                    <div className='email flex flex-col flex-wrap w-min'>
                        <p>E-mail: </p>
                        <input
                            required
                            onChange={handleChange}
                            value={formData.email}
                            name='email'
                            type="email" />
                        <span className='error-message'>L'indirizzo e-mail deve essere valido</span>
                    </div>
                    <div className='password flex flex-col flex-wrap w-min self-end'>
                        <p>
                            Password:
                        </p>
                        <input
                            required
                            onChange={handleChange}
                            value={formData.password}
                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$"
                            min={8}
                            type="password"
                            name="password" />
                        <span className='error-message'>Da 8 a 32 caratteri, almeno 1 lettera e 1 numero.
                        </span>
                    </div>

                </div>
                <div className='validate-password flex flex-col flex-wrap self-end w-min'>
                    <label htmlFor="">
                        Conferma password:
                    </label>
                    <input
                        required
                        type="password"
                        name="validatePassword"
                        pattern={formData.password} />
                    <span className='error-message'>Le password non combaciano, riprova</span>
                </div>

                <div className='form-buttons flex flex-wrap w-[100%] self-center justify-evenly'>
                    <button
                        type='reset'
                        className='reset-form bg-violet-300'>Resetta</button>
                    <button
                        type='submit'
                        className='create-account bg-green-500 hover:bg-green-400'
                    >Crea Account</button>
                </div>
            </form>
            <hr className='self-center w-[40%] bg-[#eaeaea]' />
            <Footer />
            <ToastContainer />
        </div>

    )
}

export default SignUpPage