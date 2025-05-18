document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value;
  // Avoid sending request if input is empty
  if (query.trim() === "") {
    // Optionally, reload or display all jobs when the search input is cleared
    window.location.reload();
    return;
  }
  fetch("/jobs/filter?query=${query}")
  .then(response => response.json())  // Expect JSON response
  .then(data => {
      console.log("Fetched Jobs:", data); // Debugging output

      // Check if jobs exist
      if (data.jobs && data.jobs.length > 0) {
          document.getElementById("jobListingsContainer").innerHTML = 
              data.jobs.map(job => `
                  <div class="card">
                      <h5>${job.companyname}</h5>
                      <p>${job.jobcategory} - ${job.jobdesignation}</p>
                  </div>
              `).join("");
      } else {
          document.getElementById("jobListingsContainer").innerHTML = "<p>No jobs found</p>";
      }
  })
  .catch(error => console.error("Fetch error:", error));
});
