import Joi from "joi";

export const validateUserRegisterRequest = (user) =>{
    const schema = Joi.object({
        username: Joi.string().min(2).required(),
        password: Joi.string()
        .pattern(
          new RegExp(
            /^(?=.*[0-9])(?=.*[!@#$%^&*?_\-])[a-zA-Z0-9!@#$%^&*?_\-]{8,30}$/
          )
        )
        .required(),
    });
    return schema.validate(user, { abortEarly: false });
}

export const validateUserLoginRequest = (user) =>{
    const schema = Joi.object({
        username: Joi.string().min(2).required(),
        password: Joi.string()
        .pattern(
          new RegExp(
            /^(?=.*[0-9])(?=.*[!@#$%^&*?_\-])[a-zA-Z0-9!@#$%^&*?_\-]{8,30}$/
          )
        )
        .required(),
    });
    return schema.validate(user, { abortEarly: false });
}

export const validateCreatePost = (post)=>{
  const schema = Joi.object({
    description: Joi.string().required(),
    userId: Joi.string().hex().length(24).required(),
  });

  return schema.validate(post, {abortEarly: false});
}
export const validateFollowRequest = ( follow )=> {
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    followerId: Joi.string().hex().length(24).required()
  });

  return schema.validate(follow, {abortEarly: false});
}

export const validateLikePost = (likeRequest) =>{
  const schema = Joi.object({
    postId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required()
  });

  return schema.validate(likeRequest, {abortEarly: false});
}

export const validateComment = (comment) =>{
  const schema = Joi.object({
    postId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
    comment: Joi.string().required()
  });

  return schema.validate(comment, {abortEarly: false});
}

export const validateViewNumberOfLikes = (view) =>{
  const schema = Joi.object({
    postId: Joi.string().hex().length(24).required()
  });

  return schema.validate(view, {abortEarly: false});
}

export const validateViewComments = (view) =>{
  const schema = Joi.object({
    postId: Joi.string().hex().length(24).required()
  });

  return schema.validate(view, {abortEarly: false});
}