export default class UserHandler{
    constructor(usecase, helpers, responseHandler){
        this._usecase = usecase;
        this._helpers = helpers;
        this._responseHandler = responseHandler;
    }

    async registerRequest(req, res){
        try{
            const request = req.body;
            const {error} = this._helpers.validateRegisterRequest(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            }

            const responseData = await this._usecase.createUser(request);

            if(responseData.success){
                return this._responseHandler.created(res, responseData.data);
            }else{
                return this._responseHandler.badRequest(res, responseData.error);
            }
        }catch(error){
            console.log(error);
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }


    async loginRequest(req, res){
        try{
            const request = req.body;
            const { error } = this._helpers.validateUserLoginRequest(request);
            if (error){
                return this._handler.badRequest(res, error.message);
            }
            const resp = await this._usecase.userLogin(request);
            if (resp.success) {
                return this._handler.success(res, resp.data);
            } else {
                return this._handler.badRequest(res, resp.error);
            }
        }catch(error){
            console.log(error.message);
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }

    async followUser(req, res){
        try{
            const request = req.body;
            const {error} = this._helpers.validateFollowRequest(request);
            if(error){
                return this._handler.badRequest(res, error.message);
            }
            const resp = await this._usecase.followUser(request);
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }


}