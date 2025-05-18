function deleteJob(event,id) {
    event.preventDefault();  // Prevent form submission

  // Confirm user before deleting job.
  const result = confirm("Are you sure you want to delete this job");
  if (result) {
    fetch("/job/delete/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
       window.location.href = "/jobs";
      }
    });
  }
}

function updateJob(event,id) {
    event.preventDefault();  // Prevent form submission

  // Confirm user before updating job.  // Fetch job details for update.
  const result = confirm("Are you sure you want to update this job?");
  console.log(result);
  if (result) {
    window.location.href = "/job/update/" + id;
  } 
}
