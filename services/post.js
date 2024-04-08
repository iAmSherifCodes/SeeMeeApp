export default class PostService{
    constructor(postRepo, env){
        this._repo = postRepo;
        this._env = env;
    }
}