import { PaginationProps } from '../../types/PaginationProps';
import {
  ArrowButton,
  Button,
  ButtonContainer,
  PaginationContainer,
} from './PaginationStyle';

export function Pagination({
  pagesToShow,
  totalPages,
  currentPage,
  handleNextPage,
  handlePrevPage,
  handlePageClick,
}: PaginationProps) {
  return (
    <PaginationContainer>
      <ArrowButton
        type="button"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        {'<'}
      </ArrowButton>
      <ButtonContainer>
        {pagesToShow.map((page) => (
          <Button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            disabled={page === currentPage}
          >
            {page}
          </Button>
        ))}
      </ButtonContainer>
      <ArrowButton
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </ArrowButton>
    </PaginationContainer>
  );
}
