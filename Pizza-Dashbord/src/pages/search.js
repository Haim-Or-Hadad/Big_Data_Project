import { useCallback, useMemo, useState} from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { SearchTable } from 'src/sections/search/search-table';
import { CustomersSearch } from 'src/sections/search/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';


const data = [
];

const useSearch = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useSearchIds = (data) => {
  return useMemo(
    () => {
      return data.map((data) => data.id);
    },
    [data]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState({start: '',end:''});
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const searchData = useSearch(page, rowsPerPage);
  const SearchIds = useSearchIds(searchData);
  const SearchSelection = useSelection(SearchIds);
  const [orders, setOrders] = useState([]);


  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const handleSearch = useCallback(() => {
    fetch(`http://localhost:3313/orders/?start=${searchQuery.start}&end=${searchQuery.end}`)
      .then(response => response.json())
      .then(data => setOrders(data)).then(console.log(orders))
      .catch(error => console.error(error));
  }, [searchQuery]);


  return (
    <>
      <Head>
        <title>
          Search
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                Orders Search
                </Typography>
              </Stack>
            </Stack>
            <CustomersSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Button
                onClick={handleSearch}
                variant="contained"
              >
                Search
              </Button>
            <SearchTable
              count={data.length}
              items={orders}
              onDeselectAll={SearchSelection.handleDeselectAll}
              onDeselectOne={SearchSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={SearchSelection.handleSelectAll}
              onSelectOne={SearchSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={SearchSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
