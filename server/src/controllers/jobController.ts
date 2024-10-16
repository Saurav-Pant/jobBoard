import prisma from '../config/db';
import { sendEmail } from '../services/emailService';

export const postJob = async (req: any, res: any) => {
    const { title, description, experienceLevel, endDate, companyId } = req.body;

    const parsedEndDate = new Date(endDate);
    if (isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ message: 'Invalid endDate' });
    }

    const job = await prisma.job.create({
        data: {
            title,
            description,
            experienceLevel,
            endDate: parsedEndDate,
            companyId
        }
    });

    res.status(201).json(job);
};


export const getPostedJobs = async (req: any, res: any) => {
    const companyId = req.companyId;

    try {
        const jobs = await prisma.job.findMany({ where: { companyId } });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};

export const sendJobAlerts = async (req: any, res: any) => {
    const { candidateEmails, jobId } = req.body;

    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    try {
        for (const email of candidateEmails) {
            const emailHtml = `
                <h1>${job.title}</h1>
                <p>${job.description}</p>
                <p>Experience: ${job.experienceLevel}</p>
            `;
            await sendEmail(email, 'New Job Alert', emailHtml);
        }

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending job alerts' });
    }
};
