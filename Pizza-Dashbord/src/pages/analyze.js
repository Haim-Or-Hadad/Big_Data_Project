import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  SvgIcon,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { BigMLTable } from 'src/sections/analyze/bigML-table';
import { useCallback, useMemo, useState,useEffect } from 'react';
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';

const now = new Date();

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const searchData = useSearch(page, rowsPerPage);
  const SearchIds = useSearchIds(searchData);
  const SearchSelection = useSelection(SearchIds);
  const [ml, setMl] = useState([]);


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

  const handleAnalyze = useCallback(() => {
    fetch(`http://localhost:3100/predict`)
      .then(response => response.json())
      .then(data => setMl(data)).then(console.log(ml))
      .catch(error => console.error(error));
  });
  const handleImport = useCallback(() => {
    fetch(`http://localhost:3100/createdataset`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  });



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
                Analyze Orders
                </Typography>
              </Stack>
              <Button
                  onClick={handleImport}
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
            </Stack>
            <Button
                onClick={handleAnalyze}
                variant="contained"
              >
                Analyze
              </Button>
            <BigMLTable
              count={data.length}
              items={ml}
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
