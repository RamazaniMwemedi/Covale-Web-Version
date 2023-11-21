import { createSlice } from "@reduxjs/toolkit";

const initialChatsState = {};

const keyPairsSlice = createSlice({
  name: "keyPairs",
  initialState: initialChatsState,
  reducers: {
    allKeyPairs(state, { payload }) {
      if (payload) {
        state.keyPairs = payload;
      }
    },
    addNewKeyPair(state, { payload }) {
      if (payload) {
        state = {
          ...state,
          keyPairs: state.keyPairs.push(payload),
        };
      }
    },
  },
});

const { allKeyPairs, addNewKeyPair } = keyPairsSlice.actions;

const reducer = keyPairsSlice.reducer;

export {
  allKeyPairs,
  addNewKeyPair,
};
export default reducer;

