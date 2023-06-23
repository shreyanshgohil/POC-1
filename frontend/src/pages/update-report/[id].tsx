import { CreateReport } from '@/components/CreateReport';
import { UpdateReport } from '@/types/ReportInterface';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

const UpdateReport = (props: UpdateReport) => {
  const { report } = props;
  return <CreateReport isCreate={false} reportData={report} />;
};

export const getServerSideProps = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  const response = await fetch(`http://localhost:5000/report/${id}`);
  const data = await response.json();
  console.log(data);
  return {
    props: data,
  };
};

export default UpdateReport;
