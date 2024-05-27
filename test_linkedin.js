const linkedIn = require('./linkedin_scrap');

const queryOptions = {
  keyword: "ML",
  location: "Bengaluru",
  dateSincePosted: "past Week",
  jobType: "full time",
  remoteFilter: "remote",
  salary: "100000",
  experienceLevel: "entry level",
  limit: "1",
  sortBy: "recent",
};

linkedIn.query(queryOptions).then((response) => {
  console.log(response); // An array of Job objects
});