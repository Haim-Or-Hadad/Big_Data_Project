import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';



export const AverageOrderTime = (props) => {
  const { value, sx } = props;
  const [mongoValue, setMongoValue] = useState(3);
  const getavgTime = useCallback(() => {
    fetch(`http://localhost:3005/average_order_time`)
      .then(response => response.json())
      .then(data => {
        const mongoValue1 = `${data.averageTimeMin.toFixed(2)} mins`;
        setMongoValue(mongoValue1);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    getavgTime();
  }, [getavgTime]);

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
              Average Order time
            </Typography>
            <Typography variant="h4">
              {mongoValue}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

AverageOrderTime.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
