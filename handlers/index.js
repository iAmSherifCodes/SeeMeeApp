import { validateUserRegisterRequest,
         validateUserLoginRequest,
         validateComment,
         validateCreatePost,
         validateFollowRequest,
         validateLikePost,
        validateViewNumberOfLikes }
         from "../utils/helpers.js"
import UserHandler from "./userHandler.js";
import usecase from "../services/index.js"
import ResponseHandler from "./response.js";
import PostHandler from "./postHandler.js";

const helpers = { validateUserLoginRequest,
                  validateUserRegisterRequest,
                  validateComment,
                  validateCreatePost,
                  validateFollowRequest,
                  validateLikePost,
                validateViewNumberOfLikes};

export default{
    userHandler: new UserHandler(usecase.userService, helpers, ResponseHandler),
    postHandler: new PostHandler(usecase.postService, helpers, ResponseHandler)
}