import { SearchSection } from '@/types/ReportInterface';
import Link from 'next/link';
import { FC } from 'react';

// Search section of home page
const SearchSection: FC<SearchSection> = (props) => {
  // Inits
  const { search, predictiveSearchHandler } = props;
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
    </div>
  );
};

export default SearchSection;
