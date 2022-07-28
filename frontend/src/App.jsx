import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ListQuestions from "./components/questions/ListQuestions";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateQuestion from "./components/questions/CreateQuestion";
import Question from "./components/questions/Question";

import Alert from "./components/layout/Alert";
import Spinner from "./components/layout/Spinner";

import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./store/actions/auth.actions";

function App() {
  const feedback = useSelector((state) => state.feedback);
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
      {feedback.loading && <Spinner />}
      {feedback.alert?.message && <Alert alert={feedback.alert} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<ListQuestions />} />
        <Route path="/question/:id" element={<Question />} />
        <Route
          path="/ask"
          element={<PrivateRoute component={<CreateQuestion />} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
