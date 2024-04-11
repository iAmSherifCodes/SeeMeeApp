import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";

export default class UserService{
    constructor(repo, env){
        this._repo = repo;
        this._env = env;
    }

    get repo() {
        return this._repo;
      }
    get env() {
        return this._env;
      }

    set env(env){
        this._env = env;
    }

    set repo(repo){
        this._repo = repo;
    }

    async createUser(user){
        try{

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            user.salt = salt;
            user.password = hashedPassword;

            const validateUsername = await this._repo.getUserByUsername(user.username);
            if(validateUsername){
                return {
                    success: false,
                    error: "Username already exists"
                };
            }
            const data = await this._repo.createUser(user);
            return {
                success: true,
                data
            }

        }catch(error){
            console.log(error.message);
            return {
                success: false,
                error: error.message,
              };        }
    }

    async userLogin(user){
        try{
            let userData = await this._repo.getUserByUsername(user.username.toLowerCase());
            if (!userData) {
                return {
                  success: false,
                  error: "Business User not found",
                };
            }

            const compare = await bcrypt.compare(user.password, userData.password);
            if(compare){
                const token = jwt.sign(
                    {
                      username: userData.username,
                      id: userData.id,
                    },
                    this._env.JWT_SECRET,
                    { expiresIn: "1d" }
                  );
                  delete userData.password;
                  userData.token = token;
                  return {
                    success: true,
                    data: userData
                  };
            } else{
                return{
                    success: false,
                    error: "Invalid password"
                }
            }
        }catch (error){
            console.log(error.message);
            return {
                success: false,
                error: error.message,
              };
        }
    }

    async getUserById(userId){
        try{
            const userData = this._repo.getUserById(userId);
            if(!userData){
                return{
                    success: false,
                    error: "User not found"
                };
            }
            return{
                success: true,
                userData
            }
        }catch (error){
            console.log(error.message);
            return {
                success:false,
                error: error.message
            };
        }
    }
    
    async followUser(follow){
        try{
            const user = await this._repo.getUserById(follow.userId);
            if(!user){
                return{
                    success: false,
                    error: "User not found"
                }; 
            };
            const follower = await this._repo.getUserById(follow.followerId);
            if(!follower){
                return{
                    success: false,
                    error: "Follower not found"
                }; 
            };
            const followerUsername = follower.username;
            

            const exists = user.followers.some((follower) => {
                return follower.username === followerUsername;
            });
            
            if (exists) {
                return {
                    success: false,
                    error: "Follower already exists"
                };
            }
            user.followers.push({username: followerUsername});
            const resp = await this._repo.updateUserById(follow.userId, {
                followers: user.followers,
            });
            return {
                success: true,
                data: resp
            };
        }catch(error){
            return {
                success: false,
                error: error.message,
            };
        }
    }

    async getUserFollowers(userId) {
        try {
            const user = await this._repo.getUserById(userId);
            if (!user) {
                return{
                    success: false,
                    error: "User not found"
                };
            }
            return user.followers.map(follower => follower.username);
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }

    async getAllPostsFromFollowers(userId, page = 1, limit = 10) {
        try {
            const user = await this._repo.getUserById(userId);
            if (!user) {
                return{
                    success: false,
                    error: "User not found"
                };
            }
            const followerUsernames = await this.getUserFollowers(userId);
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                populate: { path: 'userId', select: 'username' }
            };
            const posts = await Post.paginate({ userId: { $in: followerUsernames } }, options);
            return{
                success: true,
                data: posts
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
}
