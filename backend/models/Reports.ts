import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
  {
    reportName: String,
    selectedCompanies: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    createdBy: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model('Report', ReportSchema);
