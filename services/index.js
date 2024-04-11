import UserService from "./user.js";
import repo from "../repos/index.js";
import env from "../config/env.js";
import PostService from "./post.js";

export default {
    userService: new UserService(repo.userRepo, env()),
    postService: new PostService(repo.postRepo, env(), repo.userRepo)
}