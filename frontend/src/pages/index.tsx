import { FC } from 'react';
import { useUserContext } from '@/context/userContext';
import { Loader } from '@/components/Global';
const index: FC = () => {
  const { loading, user } = useUserContext();
  // Loader configuration
  if (loading) {
    return <Loader />;
  }

  return <div>index</div>;
};

export default index;
