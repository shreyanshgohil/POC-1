import { Loader } from '@/components/Global';
import { useUserContext } from '@/context/userContext';
import { Company } from '@/types/ReportInterface';
import { useRouter } from 'next/router';
import { FC, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { CreateReportProps, Error } from '@/types/ReportInterface';

// For create a report
const CreateReport: FC<CreateReportProps> = (props) => {
  // Initial State
  const { isCreate, reportData } = props;
  const INITIAL_STATE: { reportName: string; reportType: string } = {
    reportName: reportData?.reportName || '',
    reportType: reportData?.reportType || 'Profit and Loss',
  };
  const DefaultSelectedCompanies: any = reportData?.companyData.map(
    (company) => company._id
  );

  // Inits
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState<[]>(
    DefaultSelectedCompanies || []
  );
  const { loading, user } = useUserContext();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { push } = useRouter();
  const [errors, setErrors] = useState<Error>({
    reportName: '',
    selectedCompanies: '',
  });

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

  // For select the no of companies
  const selectCompanyNameHandler = (companyId: string) => {
    setErrors((prev) => {
      return {
        ...prev,
        ['selectedCompanies']: '',
      };
    });
    if (selectedCompanies.includes(companyId as never)) {
      setSelectedCompanies((prevState) =>
        prevState.filter((singleCompany) => singleCompany !== companyId)
      );
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  // calls when user do some change in input field
  const handleUserDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
    setErrors((prevState) => {
      return {
        ...prevState,
        [name]: '',
      };
    });
  };

  // For validate the form
  const validateForm = () => {
    let isValid = true;
    // For report name
    if (formData.reportName.length < 3) {
      isValid = false;
      setErrors((prevState) => {
        return {
          ...prevState,
          ['reportName']: 'Please enter the valid report name',
        };
      });
    }
    if (selectedCompanies.length === 0) {
      isValid = false;
      setErrors((prevState) => {
        return {
          ...prevState,
          ['selectedCompanies']: 'Please select at least one company',
        };
      });
    }
    return isValid;
  };

  // For handle the form submission
  const formSubmitHandler = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        const reportBody = {
          reportName: formData.reportName,
          reportType: formData.reportType,
          selectedCompanies: selectedCompanies,
          createdBy: user._id,
        };
        const response = await fetch(
          isCreate
            ? 'http://localhost:5000/report/create-report'
            : `http://localhost:5000/report/update-report/${reportData?._id}`,
          {
            credentials: 'include',
            method: isCreate ? 'post' : 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportBody),
          }
        );
        if (response.status === 200) {
          toast.success('Report created successfully');
          await push('/');
        } else {
          toast.error('Please enter valid details');
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

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
          {isCreate ? 'Create' : 'Update'} report
        </h1>
        <form className="mt-6" onSubmit={formSubmitHandler}>
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
                name={'reportName'}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleUserDataChange}
                value={formData.reportName}
              />
              <p className="text-red-700 text-sm">{errors['reportName']}</p>
            </div>
            <div className="mb-3">
              <h3 className="mb-2 text-base font-semibold">
                Choose the company for the template:
              </h3>
              {companies.map((singleCompany: Company, index) => {
                return (
                  <div className="flex items-center gap-2 mb-2" key={index}>
                    <input
                      type="checkbox"
                      id={`${index}`}
                      onChange={() =>
                        selectCompanyNameHandler(singleCompany._id)
                      }
                      checked={
                        selectedCompanies.includes(singleCompany._id)
                          ? true
                          : false
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
              <p className="text-red-700 text-sm">
                {errors['selectedCompanies']}
              </p>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                onChange={handleUserDataChange}
                name="reportType"
              >
                <option
                  value={'Profit and Loss'}
                  selected={
                    formData.reportType === 'Profit and Loss' ? true : false
                  }
                >
                  Profit and Loss
                </option>
                <option
                  value="Balance Sheet"
                  selected={
                    formData.reportType === 'Balance Sheet' ? true : false
                  }
                >
                  Balance Sheet
                </option>
              </select>
            </div>
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              {isCreate ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReport;
