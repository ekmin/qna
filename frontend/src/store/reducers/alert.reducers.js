import { createSlice } from "@reduxjs/toolkit";

const initialAlertState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
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
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
