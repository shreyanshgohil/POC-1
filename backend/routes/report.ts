import { Router } from 'express';
import {
  createReportHandler,
  deleteReportHandler,
  getAllReportHandler,
  updateReportHandler,
} from '../controllers/report';
import { authenticateUser } from '../middleware/userAuthentication';
const reportRoutes = Router();

reportRoutes.get('/all-report', getAllReportHandler);
reportRoutes.delete('/delete-report', deleteReportHandler);
reportRoutes.post('/create-report', authenticateUser, createReportHandler);
reportRoutes.put('/update-report', updateReportHandler);

export default reportRoutes;
