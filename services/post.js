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
                data: postData
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
            const post = await this._repo.getPostById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            const existingLike = post.like.find(like => like.userId.toString() === userId);
            if (existingLike) {
                post.like.push({userId, number: -1});
                const resp = await this._repo.updatePostById(post.id);
                return {
                    success: true,
                    data: resp
                }
            }
            post.like.push({ userId, number: 1 });
            const resp = await this._repo.updatePostById(post.id);
            return {
                success: true,
                data: resp
            }
        } catch (error) {
            return {
                success: false,
                error: error.message,
            }
        }
    }
}