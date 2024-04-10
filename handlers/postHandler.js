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

                  // upload image or video to cloudinary and save the url to request.image
                  const cloudinary = require('cloudinary').v2;
                  cloudinary.config({
                    cloud_name: process.env.CLOUD_NAME,
                    api_key: process.env.API_KEY,
                    api_secret: process.env.API_SECRET
                  }  
                  );
                  const file = req.file;
                  const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "auto",
                    folder: "seeMeeApp",
                    public_id: "social-media-app/" + file.filename,
                    overwrite: true,
                    tags: "social-media-app"}
                  );
                  request.image = result.secure_url;
                  request.image_id = result.public_id;
                  request.image_type = result.resource_type;
                  return this._responseHandler.created(res, request);




                  // request.image = cloudinary upload url;
            }
            const resp = await this._usecase.createPost(request);
            if (resp.success){
                return this._responseHandler.created(res, resp.data);
            };
            return this._responseHandler.badRequest(res, "Cannot create post");
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }

    async likePost (req, res){
        try{
            const request = req.body;
            const {error } = this._helpers.validateLikePost(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            }
            const resp = await this._usecase.likePost(request.postId, request.userId);
            console.log(resp);
            if (resp.success){
                return this._responseHandler.created(res, resp.data);
            }
            return this._responseHandler.badRequest(res, "Cannot like post");
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }

    async commentPost (req, res){
        try{
            const request = req.body;
            const {error } = this._helpers.validateCommentPost(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            };
            const resp = await this._usecase.commentPost(request);
            if (resp.success){
                return this._responseHandler.created(res, resp.data);
            };
            return this._responseHandler.badRequest(res, "Cannot comment post");
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }

    async viewNumberOfLikes(req, res){
        try
        {
            const request = req.body;
            const { error } = this._helpers.validateViewNumberOfLikes(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            };
            const resp = await this._usecase.viewNumberOfLikes();
            if (resp.success){
                return this._responseHandler.created(res, resp.data);
            };
            return this._responseHandler.badRequest(res, "Cannot view number of likes");
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }

  
}
