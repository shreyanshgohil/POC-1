export interface Pagination {
  paginationAmount: number;
  totalAmount: number;
  currentPage: number;
  pageChangeHandler: (page: number) => void;
}
