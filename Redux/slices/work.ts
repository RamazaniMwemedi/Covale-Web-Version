import { PostInterface } from "./../../interfaces/work";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  work: {
    posts: PostInterface[];
  };
} = {
  work: {
    posts: [],
  },
};

const workSlice = createSlice({
  name: "work",
  initialState: initialState,
  reducers: {
    addPosts(state, { payload }) {
      state.work.posts = payload;
    },
    addPost(state, { payload }: { payload: PostInterface }) {
      state.work.posts.push(payload);
    },
    
  },
});
export const { addPosts,addPost } = workSlice.actions;
export const reducer = workSlice.reducer;
