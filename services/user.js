import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

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
            throw error;
        }
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
                      email: businessData.email,
                      id: businessData.id,
                    },
                    env().JWT_SECRET,
                    { expiresIn: "1d" }
                  );
                  delete userData.password;
                  userData.token = token;
                  return{
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
}