const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    job_url : {
        type : String,
        required : true,
        unique : true
    },
    company_name : {
        type : String,
        required : true,
    },
    job_designation : {
        type : String,
    },
    logoURL:{
        type : String,
    }
    // createdBy : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "users"
    // }

}, {timestamps: true},);


const jobs = mongoose.model('jobs', jobSchema)

module.exports = jobs;