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

            const {error} = this._helpers.validateCreatePost(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            }

            if(req.file){          
                  if (req.file && req.file.fieldname != "image" || req.file.fieldname != "video") {
                    return this._handler.badRequest(res, "Use image for image file key and video for video file key");
                  }

                  const cloudinary = require('cloudinary').v2;
                  cloudinary.config({
                    cloud_name: process.env.CLOUD_NAME,
                    api_key: process.env.API_KEY,
                    api_secret: process.env.API_SECRET
                  });
                  const file = req.file;
                  const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: "auto",
                    folder: "seeMeeApp",
                    public_id: "social-media-app/" + file.filename,
                    overwrite: true,
                    tags: "social-media-app"}, (error, result) => {
                        if (error) {
                          console.error('Error uploading to Cloudinary:', error);
                          return this._responseHandler.unprocessable(res, "Error uploading file")
                        }
                    }
                  );
                  console.log(result.resource_type, "resource type");
                  if(req.file.fieldname === "image"){
                    request.image = result.secure_url;
                  }
                  if(req.file.fieldname === "video"){
                    request.video = result.secure_url;
                  }


                //   request.image_id = result.public_id;
                //   request.image_type = result.resource_type;
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

            const {error} = this._helpers.validateLikePost(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            }
            
            const resp = await this._usecase.likePost(request.postId, request.userId, req.user.username);
            // console.log(resp);
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
            const {error} = this._helpers.validateComment(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            };
            const resp = await this._usecase.commentPost(request.postId, request.userId, request.comment);
            
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
            const resp = await this._usecase.viewNumberOfLikes(request.postId);
            if (resp.success){
                return this._responseHandler.created(res, resp.data);
            };
            return this._responseHandler.badRequest(res, "Cannot view number of likes");
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }

    async viewComments(req, res){
        try{
            const request = req.body;
            const {error} = this._helpers.validateViewComments(request);
            if(error){
                return this._responseHandler.badRequest(res, error.message);
            };
            const resp = await this._usecase.viewComments(request.postId);
            if (resp.success){
                return this._responseHandler.created(res, resp.data);
            };
            return this._responseHandler.badRequest(res, "Cannot view post of comments");
        }catch(error){
            return this._responseHandler.internalServerError(res, error.message || error);
        }
    }
  
}
