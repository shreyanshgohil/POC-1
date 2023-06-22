import { Company } from '../models/index';
import { Request, Response } from 'express';

const createCompanyHandler = async (req: Request, res: Response) => {
  try {
    await Company.create(req.body);
    res.status(200).json({ message: 'Company created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const Companies = await Company.find({});
    res
      .status(200)
      .json({ message: 'Companies found successfully', Companies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', Companies: null });
  }
};

export { createCompanyHandler, getAllCompanies };
