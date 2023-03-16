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
      strokeDashArray: 2,
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
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
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
        'test',
        'test',
        'test',
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
        formatter: (value) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewBestToppings = (props) => {
  const {sx } = props;
  const chartOptions = useChartOptions();
  const [categories, setCategories] = useState([
    'test',
    'test',
    'test',
  ]);
  const getToppings = useCallback(() => {
    fetch(`http://localhost:3005/best_toppings`)
      .then(response => response.json())
      .then(data => {
        setCategories(data.bestToppings);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    getToppings();
  }, [getToppings]);


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
            onClick={getToppings}
          >
            Sync
          </Button>
        )}
        title="Best Toppings"
      />
      <CardContent>
        <Chart
          height={350}
          options={{
            ...chartOptions,
            xaxis: {
              ...chartOptions.xaxis,
              categories: categories
            }
          }}
          series={[
            {
              name: 'Best Toppings',
              data: [18, 16, 5]
            },
          ]}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
    </Card>
  );
};

OverviewBestToppings.protoTypes = {
  sx: PropTypes.object
};