import Pagination from "@mui/material/Pagination";

interface PaginationProps {
  pagination: number;
  activePage: number;
}

export const PaginationPage = (props: PaginationProps) => {
  const { pagination, activePage } = props;
  return <Pagination count={pagination} page={activePage} color="primary" />;
};
