import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import useDecodedSession from '../hooks/useDecodedSession'
import DeleteUserModal from '../Components/Modals/DeleteUserModal'
import { PropagateLoader } from 'react-spinners'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../Styles/AddProduct.css"

const UserPage = () => {

  let timeout;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const closeDeleteModal = () => setDeleteModalOpen(false)

  const loggedUser = useDecodedSession()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userError, setUserError] = useState("")
  const [productError, setProductError] = useState("")
  const [imgError, setImgError] = useState("")
  const passwordValue = {
    password: ""
  }
  const userId = (loggedUser && loggedUser.id)

  const [editFormData, setEditFormData] = useState({
    name: "",
    surname: "",
    address: "",
    city: "",
    province: "",
    cap: "",
    email: "",
  })

  const [productFormData, setProductFormData] = useState({
    name: "",
    platform: "",
    format: "",
    condition: "",
    region: "",
    genre: "",
    price: "",
    description: ""
  })

  

  const handleEditFormChange = (event) => {
    setEditFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handleNewProductChange = (event) => {
    setProductFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const handlefile = async (event) => {
    setFile(event.target.files[0])
  }

  const uploadFile = async (file) => {
    const fileData = new FormData()
    fileData.append("img", file)
    try {
      const response = await fetch(`${process.env.REACT_APP_CLOUD_UPLOAD_URL}`, {
        method: "POST",
        body: fileData
      })
      return await response.json()
    } catch (error) {
      if (error) setImgError("Si è verificato un errore durante l'upload dell'immagine.")
    }
  }
  
  function backToHomepage() {
    window.location.href = (`${process.env.REACT_APP_INDEX}`)
  }

  function reloadPage() {
    window.location.href = (`${process.env.REACT_APP_INDEX}/user-dashboard`)
  }

  const editUserInfo = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(editFormData)
      })
      setLoading(false)
      localStorage.removeItem("loggedUser")
      toast.success("Informazioni aggiornate correttamente! Effettua nuovamente l'accesso per confermarle.", {
        position: toast.POSITION.TOP_CENTER
      })
     timeout=setTimeout(backToHomepage, 5000)
    } catch (error) {
      if (error) setUserError("Si è verificato un errore durante l'aggiornamento delle informazioni. Riprova più tardi.")
    }
  }

  const submitNewProduct = async (event) => {
    event.preventDefault()
    setLoading(true)
    if (file) {
      try {
        const uploadedFile = await uploadFile(file)
        const newProductFormData = {
          ...productFormData,
          img: uploadedFile.img
        }
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newProductFormData)
        })
        setLoading(false)
        toast.success("Prodotto aggiunto correttamente!", {
          position: toast.POSITION.TOP_CENTER
        })
        timeout = setTimeout(reloadPage, 3000)
      } catch (error) {
        if (error) setProductError("Si è verificato un errore durante l'aggiunta del prodotto.")
      }
    } else {
      toast.error("Immagine mancante", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const resetEditForm = () => {
    setEditFormData({})
  }

  return (
    <div className='homepage flex flex-col justify-between w-[100%]'>
      <Header />
      <h1 className='page-title text-center text-3xl font-semibold self-center mt-10 w-[70%]'>La tua dashboard</h1>
      <div className='edit-form-container p-14 pt-5 w-fit self-center flex flex-col justify-between items-center'>
        <h3 className='text-center text-2xl font-semibold self-center pb-5 w-[100%]'>Modifica le informazioni dell'account</h3>
        <hr className='horizontal-line border-[#eaeaea] w-[100%] mb-10' />
        <form
          onSubmit={editUserInfo}
          className='signup-form flex flex-col self-center flex-wrap justify-evenly items-center gap-12 p-9 w-auto'>

          <div className='name-surname flex flex-wrap w-[100%] justify-between gap-20'>
            <div className='name-input flex flex-col w-min flex-wrap'>
              <p>Nome: </p>
              <input
                required
                onChange={handleEditFormChange}
                placeholder={loggedUser && loggedUser.name}
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
                required
                onChange={handleEditFormChange}
                placeholder={loggedUser && loggedUser.surname}
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
                required
                placeholder={loggedUser && loggedUser.address}
                onChange={handleEditFormChange}
                name='address'
                min={5}
                max={32}
                type="text" />
              <span className='error-message'>L'indirizzo deve essere valido</span>
            </div>
            <div className='city flex flex-col flex-wrap self-end w-min'>
              <p>Città: </p>
              <input
                required
                onChange={handleEditFormChange}
                placeholder={loggedUser && loggedUser.city}
                name='city'
                max={32}
                type="text" />
              <span className='error-message'>Città o comune devono essere validi</span>
            </div>
          </div>

          {
            loading && !userError &&
            <PropagateLoader className='py-5' color="#b595d5" />
          }

          {
            !loading && userError &&
            <p className='text-red-500 text-lg font-semibold w-min'>{userError}</p>
          }

          <div className='province-cap flex flex-wrap w-[100%] justify-between'>
            <div className='province flex flex-col flex-wrap w-min'>
              <p>Provincia: </p>
              <select
                required
                onChange={handleEditFormChange}
                value={editFormData.province}
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
                onChange={handleEditFormChange}
                value={editFormData.cap}
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
                onChange={handleEditFormChange}
                placeholder={loggedUser && loggedUser.email}
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
                value={passwordValue.value}
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$"
                min={8}
                type="password"
                name="password" />
              <span className='error-message'>Inserisci la password per confermare le modifiche
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
              pattern={editFormData.password} />
            <span className='error-message'>Le password non combaciano, riprova</span>
          </div>

          <div className='form-buttons flex flex-wrap w-auto self-center justify-evenly gap-5'>
            <button
              type='reset'
              onClick={resetEditForm}
              className='reset-form bg-violet-300'>Resetta</button>
            <button
              type='submit'
              className='create-account bg-green-500 hover:bg-green-400'
            >Salva modifiche</button>
          </div>
        </form>
        <button
          onClick={() => setDeleteModalOpen(true)}
          className='delete-user self-center rounded-full bg-red-500 px-2 py-2'>
          Elimina account
        </button>
      </div>



      {loggedUser && loggedUser.role === "admin" &&

        <div className='add-product-container p-14 pt-3 w-fit self-center flex flex-col justify-between items-center'>

          <h3 className='text-center text-2xl font-semibold self-center pb-5 pt-2 w-[100%]'>Aggiungi nuovo prodotto</h3>
          <hr className='horizontal-line border-[#eaeaea] w-[100%] mb-10' />

          {
            !loading && productError &&
            <p>{productError}</p>
          }
          {
            !loading && imgError &&
            <p>{imgError}</p>
          }

          <form
            encType='multipart/form-data'
            onSubmit={submitNewProduct}
            className='add-product-form flex flex-col flex-wrap justify-evenly items-between gap-5 w-fit'>
            <div className='flex flex-wrap w-fit justify-center gap-10'>
              <div className='add-product'>
                <p>Nome: </p>
                <textarea
                  required
                  name='name'
                  rows={5}
                  className='add-product-input border rounded-lg'
                  value={productFormData.name}
                  onChange={handleNewProductChange}
                />
              </div>
              <div className='add-product'>
                <p>Piattaforma: </p>
                <select
                  required
                  name="platform"
                  value={productFormData.platform}
                  onChange={handleNewProductChange}
                  className='add-product-input'>
                  <option selected hidden disabled value=""> Scegli la piattaforma</option>
                  <option>Scegli la piattaforma</option>
                  <option value="Xbox">Microsoft: Xbox</option>
                  <option value="Xbox 360">Microsoft: Xbox 360</option>
                  <option value="Xbox One">Microsoft: Xbox One</option>
                  <option value="Xbox Series X">Microsoft: Xbox Series X</option>
                  <option value="Xbox Series S">Microsoft: Xbox Series S</option>
                  <option value="Game Boy">Nintendo: Game Boy</option>
                  <option value="Game Boy Advance">Nintendo: Game Boy Advance</option>
                  <option value="Game Boy Color">Nintendo: Game Boy Color</option>
                  <option value="GameCube">Nintendo: GameCube</option>
                  <option value="NES">Nintendo: NES</option>
                  <option value="Nintendo 3DS">Nintendo: Nintendo 3DS</option>
                  <option value="Nintendo DS">Nintendo: Nintendo DS</option>
                  <option value="Super Nintendo">Nintendo: Super Nintendo</option>
                  <option value="Nintendo Switch">Nintendo: Switch</option>
                  <option value="Wii">Nintendo: Wii</option>
                  <option value="Wii U">Nintendo: Wii U</option>
                  <option value="PlayStation">Sony: PlayStation</option>
                  <option value="PlayStation 2">Sony: PlayStation 2</option>
                  <option value="PlayStation 3">Sony: PlayStation 3</option>
                  <option value="PlayStation 4">Sony: PlayStation 4</option>
                  <option value="PlayStation 5">Sony: PlayStation 5</option>
                  <option value="PSP">Sony: PSP</option>
                  <option value="PS Vita">Sony: PS Vita</option>
                </select>
              </div>
            </div>
            {
              loading && !productError &&
              <PropagateLoader className='self-center py-10' color="#b595d5" />
            }
            <div className='flex flex-wrap w-fit justify-center gap-10'>
              <div className='add-product'>
                <p>Categoria: </p>
                <select
                  required
                  name='format'
                  value={productFormData.format}
                  onChange={handleNewProductChange}
                  className='add-product-input' type="text">
                  <option selected hidden disabled>Scegli la categoria</option>
                  <option>Scegli la categoria</option>
                  <option value="game">Gioco</option>
                  <option value="console">Console</option>
                </select>
              </div>
              <div className='add-product'>
                <p>Condizione: </p>
                <select
                  required
                  name='condition'
                  value={productFormData.condition}
                  onChange={handleNewProductChange}
                  className='add-product-input'
                >
                  <option selected hidden disabled>Scegli condizione</option>
                  <option>Scegli la condizione</option>
                  <option value="new">Nuovo</option>
                  <option value="used">Usato</option>
                </select>

              </div>
            </div>
            <div className='flex flex-wrap w-fit justify-center gap-10'>
              <div className='add-product'>
                <p>Regione: </p>
                <select
                  required
                  name="region"
                  value={productFormData.region}
                  onChange={handleNewProductChange}
                  className='add-product-input w-[100%] rounded-xl'>
                  <option selected hidden disabled value="">Scegli la regione</option>
                  <option>Scegli la regione</option>
                  <option value="EUR">PAL (EUR/AU)</option>
                  <option value="USA">NTSC/U (USA)</option>
                  <option value="JAP">NTSC/J (JAP)</option>
                </select>
              </div>
              <div className='add-product'>
                <p>Genere </p>
                <select
                  name="genre"
                  value={productFormData.genre}
                  onChange={handleNewProductChange}
                  className='add-product-input w-[100%] rounded-xl'>
                  <option selected hidden disabled >Scegli il genere</option>
                  <option>Scegli il genere</option>
                  <option value="Avventura">Avventura</option>
                  <option value="Azione e Avventura">Azione e Avventura</option>
                  <option value="Corsa">Corsa</option>
                  <option value="Educativo">Educativo</option>
                  <option value="FPS">FPS</option>
                  <option value="Horror">Horror</option>
                  <option value="Mix di generi">Mix di generi</option>
                  <option value="Musicale">Musicale</option>
                  <option value="Party">Party</option>
                  <option value="Platform">Platform</option>
                  <option value="Picchiaduro">Picchiaduro</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="RPG">RPG</option>
                  <option value="Simulazione di volo">Simulazione di volo</option>
                  <option value="Sportivo">Sportivo</option>
                  <option value="Strategico">Strategico</option>
                  <option value="Stealth">Stealth</option>
                  <option value="TPS">TPS</option>
                </select>
              </div>
            </div>
            <div className='flex flex-wrap w-fit justify-center gap-10'>
              <div className='add-product'>
                <p>Prezzo (€): </p>
                <input
                  required
                  name='price'
                  type="number"
                  step={0.1}
                  value={productFormData.price}
                  onChange={handleNewProductChange}
                  className='add-product-input'
                />
              </div>
              <div className='add-product'>
                <p>Foto: <span className='img-format text-sm font-sans'>(Solo file .jpg, .jpeg, .png, .gif)</span> </p>
                <input
                  required
                  name='img'
                  type="file"
                  onChange={handlefile}
                  pattern='/\.(jpg|jpeg|gif|png|bmp)$/i.'
                  className='add-product-input product-img'
                />
              </div>
            </div>
            <div className='self-center w-[70%] flex flex-col justify-between items-center gap-5 py-5'>
              <div className='add-product-description flex flex-col justify-normal items-center w-[100%]'>
                <p>Descrizione (opzionale): </p>
                <textarea
                  rows={8}
                  name='description'
                  value={productFormData.description}
                  onChange={handleNewProductChange}
                  className='add-product-description border w-[100%]'
                  type="text" />
              </div>
              <div className='product-buttons-contaiener flex justify-between w-[100%]'>
                <button
                  className='add-product-button bg-red-500'
                  type='reset'>Resetta form
                </button>
                <button
                  className='add-product-button bg-green-500'
                  type='submit'>Salva prodotto
                </button>
              </div>
            </div>
          </form>

          <hr className='horizontal-line border-[#eaeaea] w-[100%] mt-16' />
        </div>
      }
      <ToastContainer />
      <DeleteUserModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        id={userId}
      />
      <Footer />
    </div>
  )

}
export default UserPage