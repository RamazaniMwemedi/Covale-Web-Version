"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.reactOnPostState = exports.addCommentToPost = exports.addPost = exports.addPosts = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    work: {
        posts: [],
    },
};
var workSlice = (0, toolkit_1.createSlice)({
    name: "work",
    initialState: initialState,
    reducers: {
        addPosts: function (state, _a) {
            var payload = _a.payload;
            state.work.posts = payload;
        },
        addPost: function (state, _a) {
            var payload = _a.payload;
            state.work.posts.unshift(payload);
        },
        addCommentToPost: function (state, _a) {
            var payload = _a.payload;
            var postId = payload.postId;
            var newComment = payload.newComment;
            // Find the post with the matching ID
            var postIndex = state.work.posts.findIndex(function (post) { return post.id === postId; });
            if (postIndex !== -1) {
                // Create a new post object with the updated comments array
                var updatedPost = __assign(__assign({}, state.work.posts[postIndex]), { comments: __spreadArray(__spreadArray([], state.work.posts[postIndex].comments, true), [newComment], false) });
                // Create a new array of posts with the updated post object
                var updatedPosts = __spreadArray(__spreadArray(__spreadArray([], state.work.posts.slice(0, postIndex), true), [
                    updatedPost
                ], false), state.work.posts.slice(postIndex + 1), true);
                // Return a new state object with the updated posts array
                return __assign(__assign({}, state), { work: __assign(__assign({}, state.work), { posts: updatedPosts }) });
            }
            // If the post with the matching ID is not found, return the original state object
            return state;
        },
        reactOnPostState: function (state, _a) {
            var payload = _a.payload;
            var postId = payload.postId, statusCode = payload.statusCode, newReaction = payload.newReaction, user = payload.user;
            console.log("statusCode :>>", statusCode);
            var updatedPosts = state.work.posts.map(function (post) {
                if (post.id === postId) {
                    var existingReaction = post.reactions.find(function (reaction) { return reaction.user.id === user.id; });
                    if (Number(statusCode) === 204) {
                        // If the user has already reacted with the same reaction type, remove the reaction
                        var updatedReactions = post.reactions.filter(function (reaction) { return reaction.user.id !== user.id; });
                        return __assign(__assign({}, post), { reactions: updatedReactions });
                    }
                    else if (existingReaction) {
                        // If the user has not yet reacted with the same reaction type, update the reaction
                        var updatedReactions = post.reactions.map(function (reaction) {
                            if (reaction.user.id === user.id) {
                                return __assign(__assign({}, reaction), { type: newReaction });
                            }
                            return reaction;
                        });
                        return __assign(__assign({}, post), { reactions: updatedReactions });
                    }
                    else {
                        // If it's a new reaction, add it
                        var newReactionObj = {
                            user: user,
                            type: newReaction,
                        };
                        var updatedReactions = __spreadArray(__spreadArray([], post.reactions, true), [newReactionObj], false);
                        return __assign(__assign({}, post), { reactions: updatedReactions });
                    }
                }
                return post;
            });
            return __assign(__assign({}, state), { work: __assign(__assign({}, state.work), { posts: updatedPosts }) });
        },
    },
});
exports.addPosts = (_a = workSlice.actions, _a.addPosts), exports.addPost = _a.addPost, exports.addCommentToPost = _a.addCommentToPost, exports.reactOnPostState = _a.reactOnPostState;
exports.reducer = workSlice.reducer;
