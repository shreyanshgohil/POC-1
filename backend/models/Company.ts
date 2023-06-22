import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    companyName: String,
    createdBy: { required: true, type: mongoose.Types.ObjectId },
  },
  { timestamps: true }
);

export default mongoose.model('Company', CompanySchema);
