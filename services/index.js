import UserService from "./user.js";
import userRepo from "../repos/index.js";
import env from "../config/env.js";
import PostService from "./post.js";

export default {
    userService: new UserService(userRepo, env()),
    postService: new PostService(postRepo, env(), userRepo)
}