import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const colleagueSlice = createSlice({
  name: "colleagues",
  initialState: initialState,
  reducers: {
    addExploreColleagues(state, { payload }) {
      state.colleagues = { explore: payload };
    },
    removeColleagueFromExplore(state, { payload }) {

      return {
        ...state,
        colleagues: {
          explore: state.colleagues.explore.filter(
            (colleague) => colleague.id != payload.colleagueId
          ),
        },
      };
    },
  },
});

const { addExploreColleagues, removeColleagueFromExplore } =
  colleagueSlice.actions;
const reducer = colleagueSlice.reducer;
module.exports = {
  reducer,
  addExploreColleagues,
  removeColleagueFromExplore,
};
