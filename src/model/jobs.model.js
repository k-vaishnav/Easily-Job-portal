import { jobs } from "../assets/jobs.js";
export default class JobsModel {
  static getJobs() {
    return jobs;
  }
  static getJobById(jobId) {
    return jobs.find((job) => job.id == jobId);
  }
  static addApplicant(id, name, email, contact, resume) {
    const index = jobs.findIndex((j) => j.id == id);
    let applicantId = jobs[index].applicants.length + 1;
    jobs[index].applicants.push({
      applicantId: applicantId,
      name: name,
      email: email,
      contact: contact,
      resumePath: resume,
    });
  }
  static updateJob(id, job) {
    const ind = jobs.findIndex((j) => j.id == id);
    if (ind != -1) {
      jobs[ind].jobcategory = job.jobcategory;
      jobs[ind].jobdesignation = job.jobdesignation;
      jobs[ind].joblocation = job.jobLocation;
      jobs[ind].companyname = job.companyname;
      jobs[ind].salary = job.salary;
      jobs[ind].applyby = job.applyBy;
      jobs[ind].numberofopenings = job.TotalPositions;
      jobs[ind].skillsRequired = job.skillsRequired;
      jobs[ind].applicants= [];
    }
  }
  static deleteJob(id) {
    const index = jobs.findIndex((j) => j.id == id);
    if (index != -1) {
      jobs.splice(index, 1);
    }
  }
  static getApplicants(id) {
    const job = jobs.find((j) => j.id == id);
    if (job) {
      return job.applicants;
    }
    return [];
  }
  static addJob(newJob,recruiterId) {
    const {
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsRequired,
      numberofopenings
    } = newJob;
    const job={};
    job.id = jobs.length + 1;
    job.recruiterId = recruiterId,
    job.jobcategory = jobcategory;
    job.jobdesignation = jobdesignation;
    job.joblocation = joblocation;
    job.companyname = companyname;
    job.salary = salary;
    job.applyby = applyby;
    job.skillsRequired = skillsRequired;
    job.numberofopenings = numberofopenings;
    job.applicants= [];
    job.jobposted = new Date().toISOString();
    jobs.push(job);
  }
  filterJobs(query){
    const allJObs=jobs;
    return allJObs.filter(job=>
      job.companyname.trim().toLowerCase().includes(query)
    )
  }
}
