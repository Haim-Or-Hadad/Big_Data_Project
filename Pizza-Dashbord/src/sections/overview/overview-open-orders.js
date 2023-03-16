import PropTypes from 'prop-types';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

export const OverviewOpenOrders = (props) => {
  const { value, sx } = props;
  const [mongoValue, setMongoValue] = useState(3);
  const getAllOrder = useCallback(() => {
    fetch(`http://localhost:3005/sum_orders_today`)
      .then(response => response.json())
      .then(data => {
        const mongoValue1 = Number(data.sum);
        setMongoValue(6);
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
              gutterBottom
              variant="overline"
            >
              Open Orders
            </Typography>
            <Typography variant="h4">
              {mongoValue}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {/* <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={value}
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </Card>
  );
};

OverviewOpenOrders.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
