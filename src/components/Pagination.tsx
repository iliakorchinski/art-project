// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageClick: (pageNumber: number) => void;
};

export function Pagination({
  totalPages,
  currentPage,
  handleNextPage,
  handlePrevPage,
  handlePageClick,
}: PaginationProps) {
  return (
    <div>
      <button type="button" onClick={handlePrevPage}>
        {'<'}
      </button>
      <div>
        {[...Array(totalPages)].map((_, i) => {
          return (
            <button
              key={_}
              type="button"
              onClick={() => handlePageClick(i + 1)}
              disabled={i + 1 === currentPage}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <button type="button" onClick={handleNextPage}>
        {'>'}
      </button>
    </div>
  );
}
