import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';

const INITIAL_STATE = {
  _id: '',
  userName: '',
  email: '',
  contactNo: '',
  companies: '',
};

const UserContext = createContext({
  user: INITIAL_STATE,
  loading: false,
  fetchUserData: async () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const firstTimeApiCancelRef = useRef(true);
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/user/get-user', {
        credentials: 'include',
      });
      const data = await response.json();
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (firstTimeApiCancelRef.current) {
      firstTimeApiCancelRef.current = false;
    } else {
      fetchUserData();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, loading, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
