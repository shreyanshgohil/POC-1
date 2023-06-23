import mongoose from 'mongoose';
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
    const page = +req.query.page! || 1;
    const searchQuery = req.query.search;
    const skip = (page - 1) * 5;
    const totalRecords = await Report.find().count();
    const searchRegex = new RegExp(searchQuery as string, 'i');
    if (searchQuery) {
      const reports = await Report.aggregate([
        { $match: { reportName: { $regex: searchRegex } } },
        {
          $lookup: {
            from: 'companies',
            as: 'companyData',
            localField: 'selectedCompanies',
            foreignField: '_id',
          },
        },
        {
          $skip: skip,
        },
        { $limit: 5 },
      ]);

      return res.status(200).json({
        message: 'Reports found successfully',
        reports,
        totalRecords: reports.length,
      });
    } else {
      const reports = await Report.aggregate([
        {
          $lookup: {
            from: 'companies',
            as: 'companyData',
            localField: 'selectedCompanies',
            foreignField: '_id',
          },
        },
        {
          $skip: skip,
        },
        { $limit: 5 },
      ]);
      return res
        .status(200)
        .json({ message: 'Reports found successfully', reports, totalRecords });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      reports: null,
      totalRecords: 0,
    });
  }
};

const getSingleReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const report = await Report.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: 'companies',
          as: 'companyData',
          localField: 'selectedCompanies',
          foreignField: '_id',
        },
      },
    ]);
    return res.status(200).json({
      message: 'Report found successfully',
      report: report[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateReportHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Report.replaceOne({ _id: id }, req.body);
    res.status(200).json({ message: 'Reports found successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', reports: null });
  }
};

const deleteReportHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    console.log(id);
    await Report.deleteOne({ _id: id });
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
  getSingleReport,
};
