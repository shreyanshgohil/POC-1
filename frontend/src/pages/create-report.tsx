import { Loader } from '@/components/Global';
import { useUserContext } from '@/context/userContext';
import { FC, useEffect, useState, ChangeEvent } from 'react';

interface company {
  companyName: string;
}

// For create a report
const createReport: FC = () => {
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedCompanies, setSelectedCompanies] = useState<[]>([]);
  const { loading, user } = useUserContext();

  // Fetching all the companies
  const fetchAllCompanyHandler = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/company/all-companies',
        {
          credentials: 'include',
        }
      );
      const json = await response.json();
      setCompanies(json.Companies);
    } catch (error) {
      console.log(error);
    }
  };

  // for handle the change
  const handleUserDataChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
  };

  const selectCompanyNameHandler = (companyId: string) => {
    if (selectedCompanies.includes(companyId as never)) {
      setCompanies((prevState) =>
        prevState.filter((singleCompany) => singleCompany !== companyId)
      );
    } else {
      setCompanies([...selectedCompanies, companyId] as never);
    }
  };
  console.log(selectedCompanies, 'SSSSSS');
  // For fetch all the companies
  useEffect(() => {
    if (user) {
      fetchAllCompanyHandler();
    }
  }, [user]);

  // Loader configuration
  if (loading) {
    return <Loader />;
  }

  if (!user && !loading) {
    return <h1>please do login</h1>;
  }

  // JSX
  return (
    <div className="relative p-6 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="max-w-[550px] w-full p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Create report
        </h1>
        <form className="mt-6">
          <div className="mt-6">
            <div className="mb-3">
              <label
                htmlFor="company-name"
                className="block text-sm font-semibold text-gray-800"
              >
                Report template name
              </label>
              <input
                id={'company-name'}
                type={'text'}
                name={'companyName'}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleUserDataChange}
              />
            </div>
            <div className="mb-3">
              <h3 className="mb-2 text-base font-semibold">
                Choose the company for the template:
              </h3>
              {companies.map((singleCompany: company, index) => {
                return (
                  <div className="flex items-center gap-2 mb-2" key={index}>
                    <input
                      type="checkbox"
                      id={`${index}`}
                      onChange={() =>
                        selectCompanyNameHandler(singleCompany._id)
                      }
                    />
                    <label
                      className="block text-sm font-semibold text-gray-800"
                      htmlFor={`${index}`}
                    >
                      {singleCompany.companyName}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="mb-3">
              <label
                htmlFor="reportType"
                className="mb-2 inline-block text-base font-semibold"
              >
                Report Frequency
              </label>
              <select
                id="reportType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleUserDataChange}
              >
                <option
                  value={'Profit and Loss'}
                  defaultValue={'Profit and Loss'}
                >
                  Profit and Loss
                </option>
                <option value="Balance Sheet">Balance Sheet</option>
              </select>
            </div>
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default createReport;
