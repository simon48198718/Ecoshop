import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./state/authSlice";
import axios from "axios";

import Main from "./scenes/main/Main";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import CartMenu from "./scenes/global/CartMenu";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import RequireAuth from "./scenes/auth/RequireAuth";
import Profile from "./scenes/userAccount/Profile";
import Order from "./scenes/userAccount/Order";
import Notification from "./scenes/userAccount/Notification";
import Search from "./scenes/search/Search";
import Seller from "./scenes/seller/Main";
import Store from "./scenes/store/Main";
import StoreItemDetail from "./scenes/store/ItemDetails";
import AddProduct from "./scenes/store/AddProduct";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const dispatch = useDispatch();
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current === false) {
      (async () => {
        try {
          const { data } = await axios.get("auth/user");

          if (data) {
            dispatch(setUser(data));
          }
        } catch (e) {
          console.log(e);
        }
      })();
    }
    return () => (ref.current = true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        {/* <ScrollToTop /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="item/:itemId" element={<ItemDetails />} />
            <Route path="search/:slug" element={<Search />} />
            <Route path="seller/:name" element={<Seller />} />
            <Route path="account/store/add_product" element={<AddProduct />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/success" element={<Confirmation />} />
              <Route path="order" element={<Order />} />
              <Route path="account/profile" element={<Profile />} />
              <Route path="account/order" element={<Order />} />
              <Route path="account/notification" element={<Notification />} />
              <Route path="account/store" element={<Store />} />
              <Route
                path="account/store/item/:itemId"
                element={<StoreItemDetail />}
              />
            </Route>

            {/* catch all */}
            {/* <Route path="*" element={<Missing />} /> */}
          </Route>
          {/* <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
          <Route path="order" element={<Order />} />
          <Route path="account" element={<UserAccount />} /> */}
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
