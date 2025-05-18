import JobsModel from '../model/jobs.model.js';
import UserModel from '../model/user.model.js'
import JobController from './jobs.controller.js';
export default class UserController {
    postRegister(req,res) {
        console.log(req.body);
        UserModel.addUser(req.body);
        res.redirect('/login');
    }
    getLogin(req,res) {
        res.render('login')
    }
    postLogin(req,res) {
        const {email,password} =req.body;
        const user = UserModel.isValid(email,password);
        const jobs = JobsModel.getJobs()
        if(!user){
            res.redirect(`/404?errorMessage=User not found.Please Register`);
        }
        else {
            req.session.user = user;
           req.session.email=email;

            res.render('joblistings',{jobs:jobs,user:req.session.user})
        }
    }
    logout(req,res) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
}