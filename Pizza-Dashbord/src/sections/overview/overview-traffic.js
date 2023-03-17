import PropTypes from 'prop-types';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/chart';

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent'
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.info.main
    ],
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

const iconMap = {
  Desktop: (
    <SvgIcon>
      <ComputerDesktopIcon />
    </SvgIcon>
  ),
  Tablet: (
    <SvgIcon>
      <DeviceTabletIcon />
    </SvgIcon>
  ),
  Phone: (
    <SvgIcon>
      <PhoneIcon />
    </SvgIcon>
  )
};

export const OverviewTraffic = (props) => {
  const {sx } = props;
  const [chartSeries, setChartSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const chartOptions = useChartOptions(labels);
  const getdistribution = useCallback(() => {
    fetch(`http://localhost:3005/distribution`)
      .then(response => response.json())
      .then(data => {
        setChartSeries(data.map(({ _id, count }) => count));
        setLabels(data.map(({ _id }) => _id));
        // Send the retrieved data to localhost:3001
        // fetch('http://localhost:3001/set', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ key: 'BestToppings', value: JSON.stringify(categories)})
        // });
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    getdistribution();
  }, [getdistribution]);

  return (
    <Card sx={sx}>
      <CardHeader title="Orders by region" />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item, index) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {iconMap[label]}
                <Typography
                  sx={{ my: 1 }}
                  variant="h6"
                >
                  {label}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="subtitle2"
                >
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  sx: PropTypes.object
};
