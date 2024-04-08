export default class PostHandler{
    constructor(usecase, helpers, responseHandler){
        this._usecase = usecase;
        this._helpers = helpers;
        this._responseHandler = responseHandler;
    }

    get usecase(){
        return this._usecase;
    }

    set usecase(usecase){
        this._usecase = usecase;
    }

    async createPost(req, res){
        try{
            const request = req.body;
            const {error } = this._helpers.validateCreatePost(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            }
            const resp = await this._usecase.createPost(request);

        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }
}