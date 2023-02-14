import Joi from "joi";
// const PasswordRegex =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
// const PasswordError =
//   "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";
const AdminJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().message("Enter valid email").required(),
  password: Joi.string().min(8).message("Paasword must be upto 8 characters").required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

const AdminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).message("Paasword must be upto 8 characters").required(),
});

const ProductJoiSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    category: Joi.string(),
  });

export {
  AdminJoiSchema,
  AdminLoginSchema,
  ProductJoiSchema
};



  