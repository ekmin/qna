import api from '../../utils/api';
import { authActions } from "../../store/reducers/auth.reducers";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth");

    dispatch(authActions.USER_LOADED(res.data));
  } catch (err) {
    console.log(err);
    dispatch(authActions.AUTH_ERROR());
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/register", formData);

    dispatch(authActions.REGISTER_SUCCESS(res.data));

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => setError(error.msg));
      console.log(errors);
    }

    dispatch(authActions.AUTH_ERROR());
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post("/auth", body);

    dispatch(authActions.LOGIN_SUCCESS(res.data));

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => setError(error.msg));
    }

    dispatch(authActions.LOGIN_FAIL());
  }
};
