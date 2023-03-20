import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OpenBranches } from 'src/sections/overview/overview-openbranches';
import {OverviewOrderTimes}  from 'src/sections/overview/overview-order-graph';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewOpenOrders } from 'src/sections/overview/overview-open-orders';
import { OverviewTotalOrders } from 'src/sections/overview/overview-total-orders';
import { AverageOrderTime } from 'src/sections/overview/overview-average-orderTime';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { OverviewBestToppings } from 'src/sections/overview/overview-bestToppings';
const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Overview
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OpenBranches
              difference={12}
              positive
              sx={{ height: '100%' }}
              value=""
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalOrders
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="0"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewOpenOrders
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <AverageOrderTime
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewBestToppings
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={2}
            lg={8}
          >
            <OverviewOrderTimes
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
