import { CreateReport } from '@/components/CreateReport';
import { FC } from 'react';

// For create a report
const createReport: FC = () => {
  // JSX
  return <CreateReport isCreate={true} reportData={undefined} />;
};

export default createReport;
