const { createSlice, current } = require("@reduxjs/toolkit");

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
    // Add task to sub project by id
    addTaskToSubProject(state, { payload }) {
      // Add the task to the sub project on top of the array
      state = {
        ...state,
        projects: state.projects
          .filter((project) => project.id === payload.projectId)[0]
          .subProjects.filter(
            (subProject) => subProject.id === payload.subProjectId
          )[0]
          .tasks.unshift(payload.task),
      };
    },
    clearProjects(state) {
      state.projects = initialProjectsState;
    },
  },
});

const {
  addProjects,
  clearProjects,
  addProject,
  addSubProjectId,
  addTaskToSubProject,
} = projectsSlice.actions;
const reducer = projectsSlice.reducer;
module.exports = {
  reducer,
  addProjects,
  addProject,
  addSubProjectId,
  clearProjects,
  addTaskToSubProject,
};
