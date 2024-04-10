import ResponseHandler from "../handlers/response.js";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import repo from "../repos/index.js";
const userRepo = repo.userRepo;

const verifyAuth = async (req, res, next) => {
  try {
    if (!!req && !!req.headers && !!req.headers.authorization) {
      const token = req.headers.authorization.replace("Bearer ", "");
      const obj = jwt.verify(token, env().JWT_SECRET);
      const userData = await userRepo.getUserById(obj.id);
      req.user = userData;
      next();
    } else {
        throw new Error();
    }
  } catch (error) {
    return ResponseHandler.unauthorized(res, {error: "Unauthorized"});
  }
};

export default verifyAuth;
