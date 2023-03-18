import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';
import { useState, useEffect, useCallback } from 'react';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        '08:00',
        '10:00',
        '14:00',
        '18:00',
        '22:00',
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

const countOrdersByHour = (hoursArray) => {
  const ordersByHour = {};

  hoursArray.forEach((time) => {
    const hour = time.split(':')[0];
    if (!ordersByHour[hour]) {
      ordersByHour[hour] = 0;
    }
    ordersByHour[hour]++;
  });

  return Object.entries(ordersByHour).map(([hour, count]) => ({
    time: `${hour}:00:00`,
    count,
  }));
};

export const OverviewOrderTimes = (props) => {
  const {sx } = props;
  const chartOptions = useChartOptions();
  const [chartSeries, setChartSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const dailyOrderTimes = useCallback(() => {
    fetch(`http://localhost:3005/hours_order`)
      .then(response => response.json())
      .then(data => {
        data=data.startTimes
        const ordersByHour = countOrdersByHour(data);
        setChartSeries(ordersByHour.map(({ count }) => count));
        setLabels(ordersByHour.map(({ time }) => time));
        // Send the retrieved data to localhost:3001
        fetch('http://localhost:3001/set', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: 'dailyOrderTimes', value: JSON.stringify({labels:labels, data:chartSeries})})
        });
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    dailyOrderTimes();
  }, [dailyOrderTimes]);

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
            onClick={dailyOrderTimes}
          >
            Sync
          </Button>
        )}
        title="Times"
      />
      <CardContent>
        <Chart
          height={350}
          options={{
            ...chartOptions,
            xaxis: {
              ...chartOptions.xaxis,
              categories: labels
            }
          }}
          series={[
            {
              name: 'Time',
              data: chartSeries
            },
          ]}
          type="line"
          width="100%"
        />
      </CardContent>
      <Divider />
    </Card>
  );
};

OverviewOrderTimes.protoTypes = {
  sx: PropTypes.object
};
