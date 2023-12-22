import { CommentInterface, PostInterface } from "./../../interfaces/work";
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
          comments: [newComment, ...state.work.posts[postIndex].comments], // Add newComment as the first element
          commentsLength: state.work.posts[postIndex].commentsLength + 1,
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

    reactOnPostState(state, { payload }) {
      const { postId, statusCode, newReaction, user } = payload;
      console.log("statusCode :>>", statusCode);

      const updatedPosts = state.work.posts.map((post: PostInterface) => {
        if (post.id === postId) {
          const existingReaction = post.reacts.find(
            (reaction) => reaction.user.id === user.id
          );

          if (Number(statusCode) === 204) {
            // If the user has already reacted with the same reaction type, remove the reaction
            const updatedReactions = post.reacts.filter(
              (reaction) => reaction.user.id !== user.id
            );

            return { ...post, reactions: updatedReactions };
          } else if (existingReaction) {
            // If the user has not yet reacted with the same reaction type, update the reaction
            const updatedReactions = post.reacts.map((reaction) => {
              if (reaction.user.id === user.id) {
                return { ...reaction, type: newReaction };
              }
              return reaction;
            });

            return { ...post, reactions: updatedReactions };
          } else {
            // If it's a new reaction, add it
            const newReactionObj = {
              user: user,
              type: newReaction,
            };
            const updatedReactions = [...post.reacts, newReactionObj];

            return { ...post, reactions: updatedReactions };
          }
        }
        return post;
      });

      return {
        ...state,
        work: {
          ...state.work,
          posts: updatedPosts,
        },
      };
    },
    reactOnPostCommentState(state, { payload }) {
      const { postId, commentId, statusCode, newReaction, user } = payload;

      const updatedPosts = state.work.posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              const existingReaction = comment.reactions.find(
                (reaction) => reaction.user.id === user.id
              );

              if (Number(statusCode) === 204) {
                // If the user has already reacted with the same reaction type, remove the reaction
                const updatedReactions = comment.reactions.filter(
                  (reaction) => reaction.user.id !== user.id
                );

                return { ...comment, reactions: updatedReactions };
              } else if (existingReaction) {
                // If the user has not yet reacted with the same reaction type, update the reaction
                const updatedReactions = comment.reactions.map((reaction) => {
                  if (reaction.user.id === user.id) {
                    return { ...reaction, type: newReaction };
                  }
                  return reaction;
                });

                return { ...comment, reactions: updatedReactions };
              } else {
                // If it's a new reaction, add it
                const newReactionObj = {
                  user: user,
                  type: newReaction,
                };
                const updatedReactions = [...comment.reactions, newReactionObj];

                return { ...comment, reactions: updatedReactions };
              }
            }
            return comment;
          });

          return { ...post, comments: updatedComments };
        }
        return post;
      });

      return {
        ...state,
        work: {
          ...state.work,
          posts: updatedPosts,
        },
      };
    },
    addReplyToComment(state, { payload }) {
      const { postId, commentId, reply } = payload;
      console.log(reply);

      const updatedPosts = state.work.posts.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              const updatedReplies = [...comment.replies, reply];

              return { ...comment, replies: updatedReplies };
            }
            return comment;
          });

          return { ...post, comments: updatedComments };
        }
        return post;
      });

      return {
        ...state,
        work: {
          ...state.work,
          posts: updatedPosts,
        },
      };
    },
    addCommentsToPost(state, { payload }) {
      const postId = payload.postId;
      const newComments: CommentInterface[] = payload.newComments;

      // Find the post with the matching ID
      const postIndex: number = state.work.posts.findIndex(
        (post) => post.id === postId
      );

      if (postIndex !== -1) {
        // Ensure comments is an array
        const existingComments = Array.isArray(
          state.work.posts[postIndex].comments
        )
          ? state.work.posts[postIndex].comments
          : [];

        // Filter newComments to only include those that don't already exist in existingComments
        const uniqueNewComments = newComments.filter(
          (newComment) =>
            !existingComments.some(
              (existingComment) => existingComment.id === newComment.id
            )
        );

        // Create a new post object with the updated comments array
        const updatedPost = {
          ...state.work.posts[postIndex],
          comments: [...existingComments, ...uniqueNewComments],
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

export const {
  addPosts,
  addPost,
  addCommentToPost,
  reactOnPostState,
  reactOnPostCommentState,
  addReplyToComment,
  addCommentsToPost,
} = workSlice.actions;
const reducer = workSlice.reducer;
export default reducer;
