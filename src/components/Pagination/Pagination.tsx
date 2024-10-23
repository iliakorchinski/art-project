import {
  PaginationContainer,
  ButtonContainer,
  ArrowButton,
  Button,
} from './PaginationStyle';

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
    <PaginationContainer>
      <ArrowButton type="button" onClick={handlePrevPage}>
        {'<'}
      </ArrowButton>
      <ButtonContainer>
        {[...Array(totalPages)].map((_, i) => {
          return (
            <Button
              key={_}
              type="button"
              onClick={() => handlePageClick(i + 1)}
              disabled={i + 1 === currentPage}
            >
              {i + 1}
            </Button>
          );
        })}
      </ButtonContainer>
      <ArrowButton type="button" onClick={handleNextPage}>
        {'>'}
      </ArrowButton>
    </PaginationContainer>
  );
}

// [...Array(totalPages)]
