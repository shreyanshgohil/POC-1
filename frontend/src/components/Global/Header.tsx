import { Header } from '@/Global/interfaces/global';
import { useUserContext } from '@/context/userContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

// Routes for login and logout
const withLogin: Header[] | [] = [
  { title: 'Home', url: '/' },
  { title: 'Create company', url: '/create-company' },
  { title: 'Create report', url: '/create-report' },
];
const withLogout: Header[] | [] = [
  { title: 'Home', url: '/' },
  { title: 'Login', url: '/login' },
  { title: 'Register', url: '/register' },
];

// Global Header component
const Header = () => {
  // Inits
  const { user, loading, logoutUser } = useUserContext();
  const [headerObj, setHeaderObj] = useState<Header[]>([]);
  const { push, asPath } = useRouter();

  // For handle the logout
  const logoutHandler = async () => {
    const response = await fetch('http://localhost:5000/user/logout', {
      credentials: 'include',
      method: 'post',
    });
    if (response.status === 200) {
      logoutUser();
      toast.success('Logout done successfully');
    }
  };

  // For user navigation header links
  const navigationHandler = () => {
    if (user) {
      setHeaderObj(withLogin);
    } else {
      setHeaderObj(withLogout);
    }

    if (!user && !loading) {
      push('/login');
    }
    if (user && asPath === '/register') {
      push('/');
    }
  };

  // For user navigation and header links
  useEffect(() => {
    navigationHandler();
  }, [user, loading]);
  // JSX
  return (
    <header>
      <nav className=" border-gray-200  px-6 py-2.5 bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center order-2"></div>
          <div
            className=" justify-between items-center w-full flex  order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-row space-x-8 mt-0 w-full">
              {headerObj.map((singleHeaderObj, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={singleHeaderObj.url}
                      className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700  "
                      aria-current="page"
                      style={{
                        fontWeight:
                          asPath === singleHeaderObj.url ? '700' : '400',
                      }}
                    >
                      {singleHeaderObj.title}
                    </Link>
                  </li>
                );
              })}
              {user && (
                <li
                  className="!ml-auto uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={logoutHandler}
                >
                  <button className="block  text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700  ">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
