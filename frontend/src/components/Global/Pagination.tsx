import { useRouter } from 'next/router';
import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { Pagination } from '../../types/PaginationTypes';

// Global pagination
const Pagination: FC<Pagination> = (props) => {
  // Inits
  const { paginationAmount, totalAmount, currentPage, pageChangeHandler } =
    props;
  const noOfPagination = Math.ceil(totalAmount / paginationAmount);
  const [paginationButtons, setPaginationButtons] = useState<number[]>([]);
  const { query } = useRouter();

  // for generate the pagination numbers
  const generatePaginationButton = useCallback(() => {
    if (noOfPagination <= 5) {
      const buttonsArr = [];
      for (let i = 2; i < noOfPagination; i++) {
        buttonsArr.push(i);
      }
      setPaginationButtons(buttonsArr);
    } else {
      const buttonsArr: number[] = [];
      if (currentPage <= 3) {
        buttonsArr.splice(1, 0, 2, 3, 4);
      } else if (currentPage >= noOfPagination - 2) {
        buttonsArr.splice(
          1,
          0,
          noOfPagination - 3,
          noOfPagination - 2,
          noOfPagination - 1
        );
      } else {
        buttonsArr.splice(1, 0, currentPage - 1, currentPage, currentPage + 1);
      }
      setPaginationButtons(buttonsArr);
    }
  }, [currentPage, noOfPagination]);

  // For generate the no of buttons
  useLayoutEffect(() => {
    generatePaginationButton();
  }, [query, generatePaginationButton]);

  // JSX
  return (
    <div className="flex items-center justify-center gap-1  pb-6">
      {currentPage > 1 && (
        <span
          className="cursor-pointer h-10 w-10 flex items-center justify-center"
          onClick={() => pageChangeHandler(currentPage - 1)}
        >
          &lt;
        </span>
      )}
      <span
        className={`cursor-pointer h-10 w-10 flex items-center justify-center hover:bg-[#20202080] hover:text-white ${
          1 === currentPage && '!bg-[#202020] !text-white'
        }`}
        onClick={() => {
          pageChangeHandler(1);
        }}
      >
        {1}
      </span>
      {noOfPagination > 5 && currentPage >= 4 && <span>...</span>}
      <div className="flex gap-2">
        {paginationButtons.map((singlePaginationButton, i) => {
          return (
            <span
              key={i}
              className={`cursor-pointer h-10 w-10 flex items-center justify-center hover:bg-[#20202080] hover:text-white ${
                singlePaginationButton === currentPage &&
                '!bg-[#202020] !text-white'
              }`}
              onClick={() => {
                pageChangeHandler(singlePaginationButton);
              }}
            >
              {singlePaginationButton}
            </span>
          );
        })}
      </div>
      {noOfPagination > 5 && noOfPagination - 2 > currentPage && (
        <span>...</span>
      )}
      {!(noOfPagination === 1) && (
        <span
          className={`cursor-pointer h-10 w-10 flex items-center justify-center hover:bg-[#20202080] hover:text-white ${
            noOfPagination === currentPage && '!bg-[#202020] !text-white'
          }`}
          onClick={() => {
            pageChangeHandler(noOfPagination);
          }}
        >
          {noOfPagination}
        </span>
      )}
      {currentPage < noOfPagination && (
        <span
          className="cursor-pointer h-10 w-10 flex items-center justify-center"
          onClick={() => pageChangeHandler(currentPage + 1)}
        >
          &gt;
        </span>
      )}
    </div>
  );
};

export default Pagination;
