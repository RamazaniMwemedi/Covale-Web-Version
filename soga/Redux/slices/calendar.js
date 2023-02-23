import { createSlice, current } from "@reduxjs/toolkit";

const initialChatsState = {};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialChatsState,
  reducers: {
    allEvents(state, { payload }) {},
  },
});

const { allEvents } = calendarSlice.actions;
const reducer = calendarSlice.reducer;

module.exports = {
  allEvents,
  reducer,
};
