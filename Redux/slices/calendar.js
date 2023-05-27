import { createSlice, current } from "@reduxjs/toolkit";

const initialChatsState = {};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialChatsState,
  reducers: {
    allEvents(state, { payload }) {
      if (payload) {
        state.calendar.events = payload;
      }
    },
    addNewEvent(state, { payload }) {
      if (payload) {
        // Add new event
        state = {
          ...state,
          calendar: state.calendar.events.push(payload),
        };
      }
    },
  },
});

const { allEvents } = calendarSlice.actions;
const reducer = calendarSlice.reducer;

export{
  allEvents,
  reducer,
};
