import User from "../models/User.js";

export default class UserRepo{
    async createUser (user){
        try {
            const data = await User.create(user);
            return data ? data.toJSON() : null;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUsername(username){
        try {
            const data = await User.findOne({username});
            return data ? data.toJSON() : null;
          } catch (error) {
            throw error;
          }
    }

    async getUserById(id){
        try{
            const data =  await User.findById(id);
            return data? data.toJSON(): null;
        }catch(error){
            console.log(error.message);
            throw error;
        }
    }

    async updateUserById(id, update){
        try{
            const data = await User.findByIdAndUpdate(
                id,
                {
                    $set : update,
                },
                { new : true}
            );
            return data ? data.toJSON() : null;
        }catch(error){
            console.log(error.message);
            throw error;
        }
    }
}