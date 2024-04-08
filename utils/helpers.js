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
    description: Joi.string().required,
    userId: Joi.string().hex().length(24).required()

  });

  return schema.validate(post, {abortEarly: false});
}