import { createSlice, current } from "@reduxjs/toolkit";

const initialChatsState = {};
let keyPairs = new Array();

const keyPairsSlice = createSlice({
  name: "keyPairs",
  initialState: initialChatsState,
  reducers: {
    allKeyPairs(state, { payload }) {
      if (payload) {
        for (let index = 0; index < payload.length; index++) {
          const keyPairByIndex = payload[index];
          keyPairs.push(keyPairByIndex);
        }
      }
      state.keyPairs = keyPairs;
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

module.exports = {
  allKeyPairs,
  addNewKeyPair,
  reducer,
};
