import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function TimezoneSelect(props) {

    const { field, form, ...other } = props;

    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        setError(!!(form.errors[field.name] && form.touched[field.name]));
    }, [form.errors[field.name], form.touched[field.name]]);

    const [timezones, setTimezones] = useState([{ id: '', label: '' }]);

    useEffect(() => {
        if (timezones.length === 1) {
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
        }

    }, [])

    const handleChange = (event, value) => {
        value ? form.setFieldValue(field.name, value.label) : form.setFieldValue(field.name, '');
    };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={timezones}
            value={timezones.find((option) => option.id === field.value) || timezones[0]}
            onChange={handleChange}
            sx={{ width: 300, marginBottom: "20px" }}
            renderInput={(params) => <TextField {...params} label="Huso horario de residencia" error={error}
                helperText={error ? props.form.errors[field.name] : null} />}
        />
    );
}