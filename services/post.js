import UserRepo from "../repos/UserRepo";

export default class PostService{
    constructor(postRepo, env, userRepo){
        this._repo = postRepo;
        this._env = env;
        this._userRepo = userRepo;
    }

    async createPost(post){
        try{
            const user = await this._userRepo.getUserById(post.userId);
            if(!user){
                return {
                    success: false,
                    error: "User not found"
                };
            }
            const postData = await this._repo.createPost(post);
            return {
                success: true,
                postData
            }
        }catch(error){
            console.log(error.message);
            return {
                success: false,
                error: error.message,
              };
        }
    }

    async likePost(postId, userId) {
        try {
            const post = await Post.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            if (post.likes.includes(userId)) {
                throw new Error('Post already liked');
            }
            post.likes.push(userId);
            await post.save();
            return post;
        } catch (error) {
            return {
                success: false,
                error: error.message,
            }
        }
    }
}