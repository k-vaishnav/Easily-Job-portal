import express from 'express';
import path from 'path';
import JobController  from './src/controller/jobs.controller.js';
import UserController from './src/controller/user.controller.js';
import {auth} from './src/middleware/auth.middleware.js';
import ejsLayouts from "express-ejs-layouts";
import { uploadResume } from './src/middleware/file.upload.middleware.js';
import session from 'express-session';
import cookieParser  from "cookie-parser";
import { setLastVisit} from './src/middleware/lastVisit.middleware.js';
import  validationRequest  from './src/middleware/Registervalidation.middleware.js';
import validateRequest from './src/middleware/jobApply.middleware.js';
import ApplicantController from './src/controller/applicant.controller.js';

const app = express();
app.set("view engine", "ejs");
app.set("views",path.join(path.resolve(),"src","views"));
app.use(cookieParser());
app.use(setLastVisit)
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret:"SecretKey",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
const jobcontroller = new JobController();
const usercontroller =new UserController();
const applicantcontroller = new ApplicantController();

app.use(express.static("public"))
app.use(express.static("src/views"))
app.post("/register",validationRequest,usercontroller.postRegister)
app.get("/login",usercontroller.getLogin)
app.post("/login",usercontroller.postLogin)
app.get("/logout",usercontroller.logout)


app.get("/",jobcontroller.getPage)
app.get("/jobs",jobcontroller.getJobList)
app.get("/jobs/:id",setLastVisit,jobcontroller.getJobDetailsById)
// app.post("/apply/:id",uploadResume.single('resumePath'),validateRequest,jobcontroller.jobApply)
app.get("/job/update/:id",auth,jobcontroller.getUpdateForm)
app.post("/job/update/:id",auth,jobcontroller.updateJobById)
app.post("/job/delete/:id",auth,jobcontroller.deleteJobById)


app.get("/job/applicants/:id",applicantcontroller.getApplicantsById);
app.post("/job/applicants/:id",uploadResume.single('resumePath'),validateRequest,applicantcontroller.addApplicantById);
app.get("/postjob",auth,jobcontroller.getPostJobsForm)
app.post("/jobs",auth,jobcontroller.newJob)
app.get("/jobs/filter",jobcontroller.searchJobs)
app.get("/404",jobcontroller.errorPage)
app.listen(3200);
console.log("server is running on port 3200");