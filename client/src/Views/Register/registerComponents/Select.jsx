import React from 'react'
import { TextField, MenuItem } from '@mui/material'
import { useField, useFormikContext } from 'formik'
const Select = ({
    name,
    options,
    children,
    ...otherProps
}) => {

    const { setFieldValue } = useFormikContext()

    const [field, meta] = useField(name)

    const handleChange = (event) => {
        const { value } = event.target;
        setFieldValue(name, value);
    }

    const configSelect = {
        ...field,
        ...otherProps,
        select: true,
        variant: 'outlined',
        fullWidth: true,
        onChange: handleChange
    }

    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error
    }

    return (
        <TextField {...configSelect}>
            {Object.values(options).map((item, pos) => {
              return  item !== "" &&
                    <MenuItem key={pos} value={item}>
                        {item}
                    </MenuItem>
            })}
        </TextField>
    )
}
export default Select