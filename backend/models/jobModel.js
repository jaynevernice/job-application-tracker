import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        company: {
            type: String,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        jobPlatform: {
            type: String, 
            required: true
        },

        jobLink: {
            type: String,
            required: true
        },

        appliedDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Hired'],
            default: 'Applied'
        },

        salaryRange: {
            type: String,
        },

        notes: {
            type: String, 
        },

        jobDescription: {
            type: String 
        },

        nextFollowUpDate: {
            type: Date 
        },

        jobIdFromPlatform: {
            type: String, 
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }

    },
    {
        timestamps: true,
    }
);

export const Job = mongoose.model('Job', jobSchema);