import Post from "../models/Post";

export default class PostRepo{
    async createPost (post){
        try {
            const data = await Post.create(post);

            await Post.findByIdAndUpdate(
            data.id,
            {
                $set: { verification: verification.id },
            },
            { new: true }
            );
    
            return data ? data.toJSON() : null;
        } catch (error) {
            throw error;
        }
    }

    async getPostByUserId(userId){
        try {
            const data = await Post.findByOne({userId});
            return data ? data.toJSON() : null;
          } catch (error) {
            throw error;
          }
    }

    async getPostById(id){
        try{
            const data =  await Post.findById(id);
            return data? data.toJSON(): null;
        }catch(error){
            console.log(error.message);
            throw error;
        }
    }

    async updatePostById(id, update){
        try{
            const data = await Post.findByIdAndUpdate(
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