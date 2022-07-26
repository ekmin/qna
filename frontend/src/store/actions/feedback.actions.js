import { feedbackActions } from "../reducers/feedback.reducers";

export const setAlert =
  (alertType, message, timeout = 5000) =>
  async (dispatch) => {
    dispatch(feedbackActions.SET_ALERT({ type: alertType, message: message }));
    setTimeout(() => dispatch(feedbackActions.REMOVE_ALERT()), timeout);
  };
