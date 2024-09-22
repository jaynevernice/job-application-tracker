import express, { json } from 'express';
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose';

import { Job } from './models/jobModel.js';
import jobsRoute from './routes/jobsRoute.js';
import userRoute from './routes/userRoute.js';

import cors from 'cors';
import requireAuth from './middleware/requireAuth.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Job Application Tracker!');
});

// Routes
app.use('/jobs', requireAuth, jobsRoute);

// Login and Signup
app.use(userRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Application successfully connected to database');

        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT} `);
        });

    })
    .catch((error) => {
        console.log("The application encountered an error: " + error);
    });