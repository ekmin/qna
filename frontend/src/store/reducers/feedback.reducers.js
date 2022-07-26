import { createSlice } from "@reduxjs/toolkit";

const initialFeedbackState = {
  alert: null,
  loading: false
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: initialFeedbackState,
  reducers: {
    SET_ALERT(state, action) {
      return {
        alert: {
          type: action.payload.type,
          message: action.payload.message,
        },
      };
    },
    REMOVE_ALERT(state) {
      return {
        alert: {
          type: null,
          message: null,
        },
      };
    },
    SET_LOADING(state) {
      return {
        loading: true,
      }
    },
    REMOVE_LOADING(state) {
      return {
        loading: false,
      }
    }
  },
});

export const feedbackActions = feedbackSlice.actions;

export default feedbackSlice.reducer;
