import { PostInterface } from "./../../interfaces/work";
import { createSlice, current } from "@reduxjs/toolkit";

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
      state.work.posts.unshift(payload);
    },
    addCommentToPost(state, { payload }) {
      const postId = payload.postId;
      const newComment = payload.newComment;

      // Find the post with the matching ID
      const postIndex = state.work.posts.findIndex(
        (post) => post.id === postId
      );

      if (postIndex !== -1) {
        // Create a new post object with the updated comments array
        const updatedPost = {
          ...state.work.posts[postIndex],
          comments: [...state.work.posts[postIndex].comments, newComment],
        };

        // Create a new array of posts with the updated post object
        const updatedPosts = [
          ...state.work.posts.slice(0, postIndex),
          updatedPost,
          ...state.work.posts.slice(postIndex + 1),
        ];

        // Return a new state object with the updated posts array
        return {
          ...state,
          work: {
            ...state.work,
            posts: updatedPosts,
          },
        };
      }

      // If the post with the matching ID is not found, return the original state object
      return state;
    },
  },
});
export const { addPosts, addPost, addCommentToPost } = workSlice.actions;
export const reducer = workSlice.reducer;
