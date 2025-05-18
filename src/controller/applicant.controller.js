import JobsModel from "../model/jobs.model.js";
import SendMail from "../middleware/confirmationMail.middleware.js";
export default class ApplicantController {
    getApplicantsById(req,res) {
        const id = req.params.id;
        const applicants=JobsModel.getApplicants(id);
       const job = JobsModel.getJobById(id);
        if(req.session.user){
            res.render('applicants',{job,applicants,user:req.session.user});
        }
        else{
            res.redirect(`/404?errorMessage=only recruiter is allowed to access this page, login as recruiter to continue`);
        }
    }
    async addApplicantById(req,res,next) {
            const id = req.params.id;
            const {name,email,contact}=req.body;
            const resume =  req.file.filename;
            console.log(req.body)
            JobsModel.addApplicant(id,name,email,contact,resume);
            const job = JobsModel.getJobs();
            if(!job){
                res.redirect(`/404?errorMessage=Page not found.`);
            }
            else{
                await SendMail(email);
                res.render('joblistings',{jobs:job,user:req.session.user});
            }
        }
   
}
   