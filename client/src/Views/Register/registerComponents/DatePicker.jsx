import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { useField } from 'formik';

export default function DatePickerValue(props) {
  const defaultDate = new Date();
  const { form, field } = props;

  const configPicker = {

  };

  const [field1, meta] = useField(field.name);
  if (meta.error && meta.touched) {
    configPicker.error = true
    configPicker.helperText = meta.error !== 'Este campo es obligatorio' ? 'Fecha inválida' : meta.error
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          sx={{ width: 300, margin:"10px" }}
          format='DD/MM/YYYY'
          label="Fecha de Nacimiento"
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => form.setFieldValue(field.name, newValue.toDate())}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined',
              ...configPicker
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}