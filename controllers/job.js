const jobs = require("../models/jobs");
const axios = require('axios');



async function handlePushingNewJob(req, res) {
    const body = req.body;
    const url = body.jobLink
    const { hostname } = new URL(url);

    if (!body.jobLink)
      return res.status(400).json({ msg: "Job posting link is required" });

    if(!body.companyName){
        const domainParts = hostname.split('.'); 
        const domainName = domainParts[domainParts.length - 2]; 
        const domain = domainName.charAt(0).toUpperCase() + domainName.slice(1);
        body.companyName = domain;
    }
    
    const logoUrl = `https://logo.clearbit.com/${hostname}`;
    
    try {
        await jobs.create({
            job_url: body.jobLink,
            company_name: body.companyName,
            job_designation: body.positionName,
            logoURL : logoUrl,
        });
        return res.json({"success" : true})
    } catch (error) {
        return res.json({"Error" : "Job Link already exists on the server!"});
    }
   
  }


  module.exports = {handlePushingNewJob}