import { alertActions } from "../../store/reducers/alert.reducers";

export const setAlert =
  (alertType, message, timeout = 5000) =>
  async (dispatch) => {
    dispatch(alertActions.SET_ALERT({ type: alertType, message: message }));
    setTimeout(() => dispatch(alertActions.REMOVE_ALERT()), timeout);
  };
