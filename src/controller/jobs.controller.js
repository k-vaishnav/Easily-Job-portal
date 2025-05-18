import JobsModel from "../model/jobs.model.js";

export default class JobController {
  getPage(req, res) {
    res.render("index", { user: req.session.user, errorMessage: null });
  }
  getJobList(req, res) {
    const jobs = JobsModel.getJobs();
    res.render("joblistings", { jobs: jobs, user: req.session.user });
  }
  getJobDetailsById(req, res) {
    const id = req.params.id;
    const job = JobsModel.getJobById(id);
    if (!job) {
      res.redirect(`/404?errorMessage=Page not found.`);
    } else {
      res.render("job_details", {
        job: job,
        user: req.session.user,
        errorMessage: null,
      });
    }
  }

  getUpdateForm(req, res) {
    const id = req.params.id;
    const job = JobsModel.getJobById(id);
    console.log(job);
    if (!job.recruiterId || job.recruiterId === req.session.user.id) {
      res.render("update_job", { job: job });
    } else {
      res.redirect(
        `/404?errorMessage=only posted recruiter is allowed to access this page.`
      );
    }
  }
  updateJobById(req, res) {
    const id = req.params.id;
    console.log(req.body.skillsRequired);
    JobsModel.updateJob(id, req.body);
    res.redirect(`/jobs/${id}`);
  }
   deleteJobById(req, res) {
    const id = req.params.id;
    const job = JobsModel.getJobById(id);
    if (!job.recruiterId || job.recruiterId === req.session.user.id) {
       JobsModel.deleteJob(id);
     
      return res.status(200).send('Job deleted successfully');
    } else {
      res.render("error", {
        errorMessage: "only posted recruiter is allowed to delete this Job",
      });
    }
  }
  getPostJobsForm(req, res) {
    res.render("new-job", { user: req.session.user });
  }
  newJob(req, res) {
    const recruiterId = req.session.user.id;
    JobsModel.addJob(req.body, recruiterId);
    res.redirect("/jobs");
  }
  errorPage(req, res) {
    console.log("req query", req.query);
    const errorMessage = req.query.errorMessage || "page not found"; // Default error message if none provided

    res.render("error", { errorMessage });
  }
  searchJobs(req, res) {
    if (!req.query.query) {
      return res.redirect("/error?errorMessage=Invalid search query");
    }

    const query = req.query.query.toLowerCase();
    console.log("Search Query:", query);

    const results = JobsModel.filterJobs(query); // Ensure this method exists

    if (!results.length) {
      return res.json({ jobs: [] });
    }

    res.json({ jobs: results }); // Send JSON response
  }
}
