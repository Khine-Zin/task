import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const Monthpicker = ({ value, onChange, name }) => {
  const handleChange = (date) => {
    onChange({
      target: {
        name,
        value: date ? dayjs(date).valueOf() : null,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label=""
        value={value ? dayjs(value) : null}
        onChange={handleChange}
        views={['year', 'month']} // 👈 show only year + month
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              '& .MuiInputBase-input': { padding: '0 !important' },
              width: '100%',
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default Monthpicker;
