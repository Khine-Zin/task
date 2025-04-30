import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const Datepicker = ({ value, onChange, name }) => {
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
        renderInput={(params) => (
          <TextField
            {...params}
            className="my-datepicker"

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

export default Datepicker;
