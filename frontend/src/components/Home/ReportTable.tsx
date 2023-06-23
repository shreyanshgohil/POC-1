import { FC } from 'react';
import { SvgCopy, SvgDelete, SvgEdit } from '../svgs/svg';
import { ReportTable } from '@/types/ReportInterface';
import { useRouter } from 'next/router';
// Table which showing the reports
const ReportTable: FC<ReportTable> = (props) => {
  // Inits
  const { push } = useRouter();
  const {
    totalReports,
    reports,
    deleteSvgClickHandler,
    user,
    copyTextHandler,
  } = props;

  // For edit report
  const editReportHandler = (id: string) => {
    push(`/update-report/${id}`);
  };

  //   JSX
  return (
    <div className="overflow-hidden">
      {totalReports > 0 ? (
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Report Template Name
              </th>
              <th scope="col" className="px-6 py-4">
                Report Type
              </th>
              <th scope="col" className="px-6 py-4">
                Companies Selected
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((singleReport, index) => {
              return (
                <tr
                  className="border-b transition duration-300 ease-in-out  border-neutral-500 "
                  key={index}
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    {index}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {singleReport.reportName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {singleReport.reportType}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {singleReport.companyData.map((companyData, index) => {
                      return <p key={index}>{companyData.companyName}</p>;
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 flex items-center gap-4">
                    {user && (
                      <div
                        className="cursor-pointer"
                        onClick={() => deleteSvgClickHandler(singleReport)}
                      >
                        <SvgDelete />
                      </div>
                    )}
                    <div
                      className="cursor-pointer"
                      onClick={() => copyTextHandler(singleReport.reportName)}
                    >
                      <SvgCopy />
                    </div>
                    {user && (
                      <div
                        className="cursor-pointer"
                        onClick={() => editReportHandler(singleReport._id)}
                      >
                        <SvgEdit />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No Reports Available</p>
      )}
    </div>
  );
};

export default ReportTable;
