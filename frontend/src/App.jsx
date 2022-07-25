import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import Alert from "./components/layout/Alert";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/auth.actions";

function App() {
  const alert = useSelector((state) => state.alert.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      dispatch(loadUser());
    }

    window.addEventListener("storage", () => {
      if (!localStorage.token) dispatch(authActions.LOGOUT());
    });
  }, []);

  return (
    <Router>
      {alert?.message && <Alert message={alert.message} type={alert.type} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
