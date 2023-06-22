import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
  {
    reportName: {
      type: String,
    },
    reportType: {
      type: String,
    },
    selectedCompanies: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Report', ReportSchema);
