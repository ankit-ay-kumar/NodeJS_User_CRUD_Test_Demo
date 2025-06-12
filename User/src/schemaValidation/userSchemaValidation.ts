import Joi from "joi";

export const createUserSchema = Joi.array().items(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().lowercase().email().required(),
    age: Joi.number().min(2).required(),
    department: Joi.string().required(),
  })
);

export const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().lowercase().email(),
  age: Joi.number().min(2),
  department: Joi.string(),
}).min(1);

export const userIDParamSchema = Joi.object({
  id: Joi.string().length(24).required(),
});
