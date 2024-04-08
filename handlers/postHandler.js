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
            if(req.file){
                if (!req.file.originalname.match(/\.(JPG|jpg|jpeg|JPEG|PNG|png|mp4|MP4|mov|MOV|gif|GIF|avi|AVI)$/)) {
                    return this._handler.badRequest(res, "Invalid Attachment Format");
                }
                if (req.fileValidationError) {
                    return this._handler.badRequest(res, "Incorrect file type");
                  }
          
                  if (req.file && req.file.fieldname != "image" || req.file.fieldname != "video") {
                    return this._handler.badRequest(res, "Use image for image file key and video for video file key");
                  }

                  // upload to cloudinary and save the url to request.image
                  // request.image = cloudinary upload url;
            }
            const resp = await this._usecase.createPost(request);
            if (resp.success){
                return this._responseHandler.created(res, resp.data);
            }
            return this._responseHandler.badRequest(res, "Cannot create post");
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }

  
}