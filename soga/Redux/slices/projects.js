const { createSlice } = require("@reduxjs/toolkit");
const c = console.log.bind();

let task = {
  title: String(),
  description: String(),
  assigneeL: Array(),
  startDate: Date(),
  endDate: Date(),
};

let subProject = {
  title: String(),
  id: String(),
  tasks: [task],
};
let project = {
  id: String(),
  title: String(),
  subProjects: [subProject],
};
let allProjects = [];
let initialProjectsState = {};

const projectsSlice = createSlice({
  name: "projects",
  initialState: initialProjectsState,
  reducers: {
    addProjects(state, { payload }) {
      if (payload) {
        for (let index = 0; index < payload.length; index++) {
          const projectByIndex = payload[index];
          project = {
            title: projectByIndex.title,
            id: projectByIndex.id,
            subProjects: [],
          };
          for (
            let subProjectIndex = 0;
            subProjectIndex < projectByIndex.subProject.length;
            subProjectIndex++
          ) {
            const subProjectByIndex =
              projectByIndex.subProject[subProjectIndex];
            subProject = {
              id: subProjectByIndex.id,
              title: subProjectByIndex.title,
            };
            project.subProjects.push(subProject);
          }
          allProjects.push(project);
        }
      }
      c("All projects are :", allProjects);

      state.projects = [];
      c("Payload :", payload);
      state.projects = allProjects;
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
