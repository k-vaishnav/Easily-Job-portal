import { validationResult, body } from "express-validator";
import JobsModel from "../model/jobs.model.js";
const validateRequest = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("contact")
      .isMobilePhone()
      .withMessage("please enter a valid contact Number"),
    body("resumepath")
      .custom((value, { req }) => {
        console.log(value);
        value = req.file.fileName;
        if (!req.file) {
          // Check if req.file is undefined
          throw new Error("resume is required");
        }
        return true;
      })
      .withMessage("Please enter a valid path"),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    const id = req.params.id;
    const job = JobsModel.getJobById(id);
    return res.render("job_details", {
      job,
      user: null,
      errorMessage: validationErrors.array()[0].msg,
    });
  } else {
    next();
  }
};

export default validateRequest;
