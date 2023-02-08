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
    addProject(state, { payload }) {
      if (payload) {
        state.projects.push(payload);
      }
    },
    addSubProjectId(state, { payload }) {
      state = {
        ...state,
        projects: state.projects
          .filter((project) => project.id === payload.projectId)[0]
          .subProjects.push(payload.subProject),
      };
    },

    clearProjects(state) {
      state.projects = initialProjectsState;
    },
  },
});

const { addProjects, clearProjects, addProject, addSubProjectId } =
  projectsSlice.actions;
const reducer = projectsSlice.reducer;
module.exports = {
  reducer,
  addProjects,
  addProject,
  addSubProjectId,
  clearProjects,
};
