import { Router } from 'express';
import {
  createReportHandler,
  deleteReportHandler,
  getAllReportHandler,
  updateReportHandler,
  getSingleReport,
} from '../controllers/report';
import { authenticateUser } from '../middleware/userAuthentication';
const reportRoutes = Router();

reportRoutes.get('/all-report', getAllReportHandler);
reportRoutes.get('/:id', getSingleReport);
reportRoutes.delete('/delete-report', authenticateUser, deleteReportHandler);
reportRoutes.post('/create-report', authenticateUser, createReportHandler);
reportRoutes.put('/update-report/:id', authenticateUser, updateReportHandler);

export default reportRoutes;
