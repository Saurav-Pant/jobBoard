import { Router } from 'express';
import { postJob, sendJobAlerts,getPostedJobs } from '../controllers/jobController';
import verifyToken from '../middlewares/authMiddleware';

const router = Router();

router.post('/post-jobs', postJob);
router.post('/send-job-alerts', sendJobAlerts);
router.get('/post-jobs',verifyToken, getPostedJobs);

export default router;
