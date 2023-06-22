import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { DynamicInput } from '../components/DynamicForm';
import data from '../constants/Form.json';
import { useUserContext } from '@/context/userContext';
import { Loader } from '@/components/Global';

const INITIAL_STATE: { companyName: string } = {
  companyName: '',
};

// Login page
const CreateCompany: FC = () => {
  // Inits
  const { createCompanyFields } = data;
  const [companyData, setCompanyData] = useState(INITIAL_STATE);
  const { loading, user } = useUserContext();
  const [errors, setErrors] = useState({});
  const { push } = useRouter();

  // Loader configuration
  if (loading) {
    return <Loader />;
  }
  if (!user && !loading) {
    return <h1>please do login</h1>;
  }
  // calls when user do some change in input field
  const handleUserDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompanyData((prevState) => {
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
    for (const [key, value] of Object.entries(companyData)) {
      // For company name
      if (companyData.companyName.length < 3) {
        isValid = false;
        setErrors((prevState) => {
          return {
            ...prevState,
            [key]: 'please enter the valid company Name',
          };
        });
      }
    }
    return isValid;
  };

  //Handling the form submission
  const formSubmitHandler = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const companyBody = {
        ...companyData,
        createdBy: user._id,
      };
      const isValid = validateForm();
      if (isValid) {
        const response = await fetch(
          'http://localhost:5000/company/create-company',
          {
            credentials: 'include',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyBody),
          }
        );
        if (response.status === 200) {
          toast.success('Company created successfully');
          push('/');
        } else {
          toast.error('Please enter valid email and password');
        }
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  // JSX
  return (
    <div className="relative p-6 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="max-w-[550px] w-full p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Create company
        </h1>

        <form className="mt-6" onSubmit={formSubmitHandler}>
          {createCompanyFields.map((singleFieldData, index) => {
            return (
              <DynamicInput
                key={index}
                singleFieldData={singleFieldData}
                handleUserDataChange={handleUserDataChange}
                errors={errors}
              />
            );
          })}

          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCompany;
