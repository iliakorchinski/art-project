import {
  PaginationContainer,
  ButtonContainer,
  ArrowButton,
  Button,
} from './PaginationStyle';

type PaginationProps = {
  step: number;
  pagesToShow: number[];
  totalPages: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageClick: (pageNumber: number) => void;
};

export function Pagination({
  step,
  pagesToShow,
  totalPages,
  currentPage,
  handleNextPage,
  handlePrevPage,
  handlePageClick,
}: PaginationProps) {
  console.log('currentPage', currentPage);
  console.log('step', step);
  console.log('pagesToShow', pagesToShow);
  return (
    <PaginationContainer>
      <ArrowButton type="button" onClick={handlePrevPage}>
        {'<'}
      </ArrowButton>
      <ButtonContainer>
        {pagesToShow.map((page, i) => {
          return (
            <Button
              key={`${i + 1}`}
              type="button"
              onClick={() => handlePageClick(i + step)}
              disabled={i + step === currentPage}
            >
              {i + step}
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
