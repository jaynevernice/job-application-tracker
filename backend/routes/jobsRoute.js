import express, { json } from 'express';
import { Job } from '../models/jobModel.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        const errors = [];

        if (!request.body.title) errors.push({ field: "title", message: "Title is required" });
        if (!request.body.company) errors.push({ field: "company", message: "Company is required" });
        if (!request.body.location) errors.push({ field: "location", message: "Location is required" });
        if (!request.body.jobPlatform) errors.push({ field: "jobPlatform", message: "Job platform is required" });

        if (!request.body.jobLink) {
            errors.push({ field: "jobLink", message: "Job link is required" });
        } else {
            const urlPattern = new RegExp('^(https?:\\/\\/)?' + 
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + 
                '((\\d{1,3}\\.){3}\\d{1,3}))' + 
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
                '(\\?[;&a-z\\d%_.~+=-]*)?' + 
                '(\\#[-a-z\\d_]*)?$', 'i'); 
            if (!urlPattern.test(request.body.jobLink)) {
                errors.push({ field: "jobLink", message: "Job link must be a valid URL" });
            }
        }

        // Validate date
        if (!request.body.appliedDate || isNaN(new Date(request.body.appliedDate).getTime())) {
            errors.push({ field: "appliedDate", message: "Applied date must be a valid date" });
        }

        // Validate optional fields like `status`
        const validStatuses = ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Hired'];
        if (request.body.status && !validStatuses.includes(request.body.status)) {
            errors.push({ field: "status", message: `Status must be one of ${validStatuses.join(', ')}` });
        }

        if (errors.length > 0) {
            return response.status(400).json({ status: "error", errors });
        }

        const newJob = {
            title: request.body.title,
            company: request.body.company,
            location: request.body.location,
            jobPlatform: request.body.jobPlatform,
            jobLink: request.body.jobLink,
            appliedDate: request.body.appliedDate,
            status: request.body.status,
            salaryRange: request.body.salaryRange,
            notes: request.body.notes,
            jobDescription: request.body.jobDescription,
            nextFollowUpDate: request.body.nextFollowUpDate,
            jobIdFromPlatform: request.body.jobIdFromPlatform,
            userId: request.user._id, 
        }

        const job = await Job.create(newJob);

        response.status(201).json({
            status: "success",
            data: job,
            message: "Job created successfully."
        });

    } catch (error) {
        console.log('Error:' + error);
        response.status(500).json({ message: error.message });
    }
});

// Read all jobs
router.get('/', async (request, response) => {
    try {
        
        const userId = request.user._id;

        const jobs = await Job.find({userId}).sort({created: -1});

        return response.status(200).json({
            count: jobs.length,
            data: jobs
        });

    } catch (error) {

        console.log(error.message);
        response.status(500).json({ message: error.message });

    }
});

// Read one book
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const job = await Job.findById(id);

        return response.status(200).json(job);

    } catch (error) {

        console.log(error.message);
        response.status(500).json({ message: error.message });

    }
});

// Update a book
router.put('/:id', async (request, response) => {
    try {

        if (
            !request.body.title ||
            !request.body.company ||
            !request.body.location ||
            !request.body.jobPlatform ||
            !request.body.jobLink ||
            !request.body.appliedDate
        ) {
            return response.status(400).json({
                message: 'Missing required fields',
            });
        }

        const { id } = request.params;

        const foundJob = await Job.findByIdAndUpdate(id, request.body);

        if (!foundJob) {
            return response.status(404).json({ message: error.message });
        }

        return response.status(200).json({ message: 'Job updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Delete a book
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const foundJob = await Job.findByIdAndDelete(id);

        if (!foundJob) {
            return response.status(404).json({ message: error.message });
        }

        return response.status(200).json({ message: 'Job deleted successfully' });

    } catch (error) {

        console.log(error.message);
        response.status(500).json({ message: error.message });

    }
});

export default router;