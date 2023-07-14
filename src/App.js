import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import NewGames from './Pages/NewGames';
import NewConsoles from './Pages/NewConsoles';
import UsedGames from './Pages/UsedGames';
import UsedConsoles from './Pages/UsedConsoles';
import SignUpPage from './Pages/SignUpPage';
import ProductPage from './Pages/ProductPage';
import UserPage from './Pages/UserPage';
import OrdersPage from './Pages/OrdersPage';
import PaymentPage from "./Pages/PaymentPage"
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import ShopContextProvider from './Context/ShopContextProvider';
import { useState } from 'react';
import CartItem from './Components/CartItem';

function App() {

  const [PRODUCTS, setPRODUCTS] = useState([])

  return (

    <ShopContextProvider
      PRODUCTS={PRODUCTS}
    >
      <BrowserRouter>
        <CartItem
          PRODUCTS={PRODUCTS} />

        <Routes>
          <Route exact path={"/"} element={<Homepage
            setPRODUCTS={setPRODUCTS} />} />
          <Route path={"/giochi-nuovi"} element={<NewGames />} />
          <Route path={"/giochi-usati"} element={<UsedGames />} />
          <Route path={"/console-nuove"} element={<NewConsoles />} />
          <Route path={"/console-usate"} element={<UsedConsoles />} />
          <Route path={"/crea-account"} element={<SignUpPage />} />
          <Route path={"/prodotto/:id"} element={<ProductPage />} />
          <Route path={"/checkout"} element={<PaymentPage
            PRODUCTS={PRODUCTS} />} />
          <Route element={<ProtectedRoutes />}>
            <Route path={"/user-dashboard"} element={<UserPage />} />
            <Route path={"/ordini"} element={<OrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>

  );
}

export default App;
