import { Report } from '../models/index';
import { Request, Response } from 'express';

const createReportHandler = async (req: Request, res: Response) => {
  try {
    await Report.create(req.body);
    res.status(200).json({ message: 'Report created successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getAllReportHandler = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find({});
    res.status(200).json({ message: 'Reports found successfully', reports });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', reports: null });
  }
};

const updateReportHandler = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find({});
    res.status(200).json({ message: 'Reports found successfully', reports });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', reports: null });
  }
};

const deleteReportHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const reports = await Report.deleteOne({ _id: id });
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export {
  createReportHandler,
  getAllReportHandler,
  deleteReportHandler,
  updateReportHandler,
};
