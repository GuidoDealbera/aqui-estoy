import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue(props) {
  const defaultDate = new Date();
  const { form, field } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          sx={{ width: 300 }}
          format='DD/MM/YYYY'
          label="Fecha de Nacimiento"
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => form.setFieldValue(field.name, newValue.toDate())}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}