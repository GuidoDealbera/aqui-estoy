import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function TimezoneSelect(props) {

    const { field, form, ...other } = props;

    const [timezones, setTimezones] = useState([{ id: '', label: '' }]);

    useEffect(() => {
        if(timezones.length===1){
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
        form.setFieldValue(field.name, value.id);
    };

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={timezones}
            value={timezones.find((option) => option.id === field.value) || timezones[0]}
            onChange={handleChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Timezone" />}
        />
    );
}