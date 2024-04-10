import UserRepo from "./UserRepo.js";
import PostRepo from "./PostRepo.js";

export default{
    userRepo: new UserRepo(),
    postRepo: new PostRepo(),
}