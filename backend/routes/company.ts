import { Router } from 'express';
import { createCompanyHandler, getAllCompanies } from '../controllers/company';
import { authenticateUser } from '../middleware/userAuthentication';

const companiesRoutes = Router();

companiesRoutes.post('/create-company', authenticateUser, createCompanyHandler);

companiesRoutes.get('/all-companies', authenticateUser, getAllCompanies);

export default companiesRoutes;
