import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux";

import AppRouter from "./navigation/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import 'react-toastify/dist/ReactToastify.css';

import { loadUser } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "BOM App"
    dispatch(loadUser());
  }, [dispatch])

  return (
    <BrowserRouter>
      <IconContext.Provider value={{ color: 'white' }}>
        <ToastContainer theme="dark" />
        <Header />
        <div className="container mx-auto">
          <AppRouter />
        </div>
        <Footer />
      </IconContext.Provider>
    </BrowserRouter>
  );
}

export default App;
