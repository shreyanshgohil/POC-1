import { SearchSection } from '@/types/ReportInterface';
import Link from 'next/link';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';

// Search section of home page
const SearchSection: FC<SearchSection> = (props) => {
  // Inits
  const { search, predictiveSearchHandler } = props;
  const [loading, setLoading] = useState(false);

  const performBackupHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://mongodb-backup.azurewebsites.net/api/Backup'
      );
      if (response.status === 200) {
        toast.success('File uploaded to the Database');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  // JSX
  return (
    <div className="search section flex items-center justify-end mr-3 gap-2">
      <div className="mb-2">
        <input
          type={'text'}
          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          onChange={predictiveSearchHandler}
          placeholder="search Report"
          value={search}
        />
      </div>
      <Link
        href={'/create-report'}
        className="uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        +create-report
      </Link>
      <button
        className={`uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          loading ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
        onClick={performBackupHandler}
      >
        {loading ? 'Loading' : 'Perform Backup'}
      </button>
    </div>
  );
};

export default SearchSection;
