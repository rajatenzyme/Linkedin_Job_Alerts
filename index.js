const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const linkedIn = require('./linkedin_scrap');


const { connectToDb } = require("./connection");
const { handlePushingNewJob } = require('./controllers/job');

connectToDb("mongodb://127.0.0.1:27017/hiring-info").then(() =>
  console.log("MongoDB Connected")
);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Route to handle job posting submission
// app.post('/api/v1/job', async (req, res) => {
//     try {
//         console.log("Hi")
//         const { jobLink } = req.body;
//         const domain = new URL(jobLink).hostname;

//         // Fetch company logo using Clearbit API
//         const logoUrl = `https://logo.clearbit.com/${domain}`;
//         const response = await axios.get(logoUrl);
//         // console.log(response)


//         const companyName = "Example Company"; // Placeholder for now
//         const positionName = "Enter Position"

//         res.json({ logoUrl: response.config.url, companyName, positionName });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
  const queryOptions = req.body;
  console.log(queryOptions);
  const response = await linkedIn.query(queryOptions)
  res.json(response);
});


app.post('/api/v1/job', handlePushingNewJob)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
