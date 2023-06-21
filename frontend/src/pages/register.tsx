import { useState, FC, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { regex } from '../utils/regex';
import data from '../constants/Form.json';
import { DynamicInput } from '../components/DynamicForm';
import toast from 'react-hot-toast';

const INITIAL_STATE = {
  userName: '',
  email: '',
  password: '',
  contactNo: '',
};

const Register: FC = () => {
  // Inits
  const { registerFields } = data;
  const { push } = useRouter();
  const [registrationFormData, setRegistrationFormData] =
    useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  // calls when user do some change in input field
  const handleUserDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegistrationFormData((prevState) => {
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
    for (const [key, value] of Object.entries(registrationFormData)) {
      // For email id
      if (key === 'email') {
        isValid = regex.email.test(value);
        if (!isValid) {
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid email id',
            };
          });
        }
      }

      // For password
      if (key === 'password') {
        if (value.length < 6) {
          isValid = false;

          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid password',
            };
          });
        }
      }
      // For phone number
      if (key === 'contactNo') {
        if (value.length !== 10) {
          isValid = false;
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid phone number',
            };
          });
        }
      }

      if (key === 'userName') {
        if (value.length < 3) {
          isValid = false;
          setErrors((prevState) => {
            return {
              ...prevState,
              [key]: 'please enter the valid User name',
            };
          });
        }
      }
    }
    return isValid;
  };

  //Handling the form submission
  const formSubmitHandler = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        const response = await fetch('http://localhost:5000/user/register', {
          credentials: 'include',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationFormData),
        });
        if (response.status === 200) {
          toast.success('Register done successfully');
          push('/login');
        } else {
          toast.error('Please enter valid Details');
        }
      }
    } catch (err) {
      toast.error('Something went wrong');
      console.log(err);
    }
  };

  return (
    <div className="relative p-6 flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="max-w-[550px] w-full p-6  m-auto bg-white rounded-md shadow-xl shadow-rose-600/40  ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
          Register
        </h1>
        <form className="mt-6" onSubmit={formSubmitHandler}>
          {registerFields.map((singleFieldData, index) => {
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
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700 ">
          Have an account?
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
