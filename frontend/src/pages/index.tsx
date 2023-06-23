import { Loader } from '@/components/Global';
import DeletePopup from '@/components/Global/DeletePopup';
import Pagination from '@/components/Global/Pagination';
import { ReportTable, SearchSection } from '@/components/Home';
import { useUserContext } from '@/context/userContext';
import { HomePageProps } from '@/types/Home';
import { Report } from '@/types/ReportInterface';
import { NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

// Home page
const index: FC<HomePageProps> = (props) => {
  // Inits
  const { query } = props;
  const { loading, user } = useUserContext();
  const { push } = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(+query.page! || 1);
  const [reports, setReports] = useState<Report[] | []>([]);
  const [totalReports, setTotalReports] = useState(0);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [search, setSearch] = useState<string>((query.search as string) || '');
  const [deleteSelectedReport, setDeleteSelectedReport] = useState<Report | {}>(
    {}
  );

  // For fetch all the reports
  const fetchAllReports = async (page: number, searchQuery: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/report/all-report?page=${page}&search=${searchQuery}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setTotalReports(data.totalRecords);
      setReports(data.reports);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle the pagination of the page
  const pageChangeHandler = (pageNumber: number) => {
    push({ query: { ...query, page: pageNumber } });
    setCurrentPage(pageNumber);
    fetchAllReports(pageNumber, search);
  };

  // For handle the open and close of the popup
  const togglePopupHandler = () => {
    setOpenPopup(!openPopup);
  };

  // For handle delete svg click
  const deleteSvgClickHandler = (report: Report) => {
    togglePopupHandler();
    setDeleteSelectedReport(report);
  };

  // For delete an report
  const deleteSelectedItemHandler = async () => {
    try {
      const body = { id: deleteSelectedReport._id };
      const response = await fetch(
        'http://localhost:5000/report/delete-report',
        {
          credentials: 'include',
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );
      if (response.status === 200) {
        toast.success('Report deleted successfully');
        setReports((prevState) =>
          prevState.filter(
            (singleReport) => singleReport._id !== deleteSelectedReport._id
          )
        );
        togglePopupHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //For perform the predictive search
  const predictiveSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const { value: searchQuery } = event.target;
      push({ query: { page: 1, search: searchQuery } });
      setSearch(searchQuery);
      fetchAllReports(1, searchQuery);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  //copy title handler
  const copyTextHandler = (reportTitle: string) => {
    navigator.clipboard.writeText(reportTitle);
    toast.success('Text copied to clipboard');
  };

  useEffect(() => {
    fetchAllReports(currentPage, search);
  }, []);

  // Loader configuration
  if (loading) {
    return <Loader />;
  }
  // JSX
  return (
    <>
      <div className="flex flex-col max-w-full">
        <div className="overflow-x-auto ">
          <SearchSection
            predictiveSearchHandler={predictiveSearchHandler}
            search={search}
          />
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <ReportTable
              copyTextHandler={copyTextHandler}
              user={user}
              reports={reports}
              totalReports={totalReports}
              deleteSvgClickHandler={deleteSvgClickHandler}
            />
          </div>
        </div>
      </div>
      {openPopup && (
        <DeletePopup
          togglePopupHandler={togglePopupHandler}
          deleteSelectedItemHandler={deleteSelectedItemHandler}
        />
      )}
      {totalReports > 0 && (
        <Pagination
          currentPage={currentPage}
          paginationAmount={5}
          totalAmount={totalReports}
          pageChangeHandler={pageChangeHandler}
        />
      )}
    </>
  );
};

// Rendering the code at server side
export const getServerSideProps = (req: NextApiRequest) => {
  return {
    props: {
      query: req.query,
    },
  };
};

export default index;
