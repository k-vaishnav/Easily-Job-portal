import {validationResult,body} from 'express-validator';
const validationRequest = async(req,res,next) =>{
    const rules=[
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Email is requied'),
        body('password')
        .isString().withMessage('Password is required')
        .matches(/[a-z]/).withMessage('Password must contain atleast one lowercase letter')
        .matches(/\d/)
        .withMessage("password must contain atleaast one numeric digit")
        .matches(/[!@#$%&*(),.{}|<>]/)
        .withMessage("password must contain atleast one special character")
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .isLength({min:8}).withMessage('Password must contain  at least 8 characters')
    ];
    await Promise.all(rules.map(rule => rule.run(req)));
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
        return res.render("index", {
          errorMessage: validationErrors.array(),
          user:null
        });
      } else {
        next();
      }
    };
    export default validationRequest;
