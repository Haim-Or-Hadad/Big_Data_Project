import { Card, DesktopDatePicker, InputAdornment, SvgIcon } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';

export const CustomersSearch = ({ searchQuery, setSearchQuery }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateRangeChange = (newValue) => {
    setDateRange(newValue);
    let startDate = newValue[0] ? dayjs(newValue[0]).format('YYYY-MM-DD') : '';
    let endDate = newValue[1] ? dayjs(newValue[1]).format('YYYY-MM-DD') : '';
    setSearchQuery({start: startDate,end:endDate})
  };

  return (
    <Card sx={{ p: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker 
          value={dateRange} 
          onChange={handleDateRangeChange} 
          localeText={{ start: 'Start-date', end: 'End-date' }} 
        />
      </LocalizationProvider>
    </Card>
  );
};

