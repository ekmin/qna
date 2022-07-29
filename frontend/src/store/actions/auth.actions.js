import api from "../../utils/api";
import { authActions } from "../../store/reducers/auth.reducers";
import { feedbackActions } from "../reducers/feedback.reducers";
import { setAlert } from "./feedback.actions";

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
    dispatch(feedbackActions.SET_LOADING());

    const res = await api.post("/register", formData);

    dispatch(authActions.REGISTER_SUCCESS(res.data));

    dispatch(feedbackActions.REMOVE_LOADING());

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch(loadUser());

    dispatch(setAlert("success", "Successfully logged in"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(feedbackActions.REMOVE_LOADING());
      errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
    }

    dispatch(authActions.AUTH_ERROR());
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    dispatch(feedbackActions.SET_LOADING());
    
    const res = await api.post("/auth", body);

    dispatch(authActions.LOGIN_SUCCESS(res.data));

    dispatch(feedbackActions.REMOVE_LOADING());

    dispatch(loadUser());

    dispatch(setAlert("success", "Successfully logged in"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(feedbackActions.REMOVE_LOADING());
      errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
    }

    dispatch(authActions.LOGIN_FAIL());
  }
};

export const logout = () => async (dispatch) => {
  dispatch(authActions.LOGOUT());
  dispatch(setAlert("success", "Successfully logged out"));
};
