import React from 'react'
import { MuiTelInput } from 'mui-tel-input'
import { useField, useFormikContext } from 'formik'

const PhoneNumberInput = ({
    name,
    label,
    ...otherProps
}) => {

    const {setFieldValue} = useFormikContext()

    const [field, meta] = useField(name)

    const changeHandler = (value) => {
        setFieldValue(name, value)
    }

    const configPhone = {
        ...field,
        ...otherProps,
        label
    }

    if (meta.error && meta.touched) {
        configPhone.error = true;
        configPhone.helperText = meta.error
    }
  

  return <MuiTelInput {...configPhone} onChange={changeHandler}/>
}

export default PhoneNumberInput