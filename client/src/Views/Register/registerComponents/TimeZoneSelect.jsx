import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useField } from 'formik';

export default function TimezoneSelect(props) {

    const { field, form, ...other } = props;

    const [field1, meta] = useField("cityTimeZone")

    const [timezones, setTimezones] = useState([]);

    useEffect(() => {
               axios("/getCityTimeZone").then(
            (response) => {
                const { data } = response;
                const result = data.map((timezone) => {
                    return {
                        id: timezone.id,
                        label: `${timezone.offSet} ${timezone.zoneName}`
                    }
                })
                setTimezones([...timezones, ...result])
            }
        )
     
    }, [])

    const handleChange = (event, value) => {
        value ? form.setFieldValue(field.name, value.id) : form.setFieldValue(field.name, '');
    };

    const configSelect = {

    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={timezones}
            value={timezones.find((option) => option.id === field.value) || null}
            onChange={handleChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} {...field1} {...configSelect} label="Huso horario de residencia" />}
        />
    );
}