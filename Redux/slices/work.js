"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.addPost = exports.addPosts = void 0;
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
            state.work.posts.push(payload);
        },
    },
});
exports.addPosts = (_a = workSlice.actions, _a.addPosts), exports.addPost = _a.addPost;
exports.reducer = workSlice.reducer;
