import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  work: {};
} = {
  work: {},
};

const workSlice = createSlice({
  name: "work",
  initialState: initialState,
  reducers: {},
});

export const {} = workSlice.actions;
const reducer = workSlice.reducer;
export default reducer;
