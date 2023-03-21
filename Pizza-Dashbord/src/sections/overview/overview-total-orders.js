import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';


export const OverviewTotalOrders = (props) => {
  const { difference, positive = false, sx, value } = props;
  const [mongoValue, setMongoValue] = useState(3);
  const getAllOrder = useCallback(() => {
    fetch(`http://localhost:3005/count`)
      .then(response => response.json())
      .then(data => {
        setMongoValue(Number(Math.round(data.count/2)));
        // Send the retrieved data to localhost:3001
        fetch('http://localhost:3001/set', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ key: 'TotalOrders', value: Number(Math.round(data.count/2)) })
        });
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    getAllOrder();
  }, [getAllOrder]);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total Orders
            </Typography>
            <Typography variant="h4">
              {mongoValue}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon>
              <Typography
                color={positive ? 'success.main' : 'error.main'}
                variant="body2"
              >
                {difference}%
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

OverviewTotalOrders.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

