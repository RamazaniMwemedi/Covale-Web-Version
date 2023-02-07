const { createSlice } = require("@reduxjs/toolkit");

let initialProjectsState = {};

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialProjectsState,
  reducers: {
    addProjects(state, { payload }) {
      if (payload) {
        state.projects = payload;
      }
    },
    clearProjects(state) {
      state.projects = initialProjectsState;
    },
  },
});

const { addProjects, clearProjects } = projectsSlice.actions;
const reducer = projectsSlice.reducer;
module.exports = {
  reducer,
  addProjects,
  clearProjects,
};
