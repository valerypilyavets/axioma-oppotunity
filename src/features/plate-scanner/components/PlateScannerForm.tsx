import { FormProps, ValidationMessages } from '../../common/commonInterfaces';
import { PlateScannerPayload } from '../plateScannerInterfaces';

import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';

export function PlateScannerForm(props: FormProps<PlateScannerPayload>) {
  const { submitCallback, initialValues } = props;
  const validate = (values: PlateScannerPayload) => {
    const errors: Partial<PlateScannerPayload> = {};
    if (!values.plateNumber) {
      errors.plateNumber = ValidationMessages.REQUIRED_FIELD;
    } else if (!/^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$/i.test(values.plateNumber)) {
      errors.plateNumber = ValidationMessages.INVALID_PLATE_NUMBER;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate,
    onSubmit: values => {
      submitCallback(values);
    },
  });

  return (
    <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='plateNumber'
        label='Plate number'
        name='plateNumber'
        onChange={formik.handleChange}
        value={formik.values.plateNumber}
        error={!!formik.errors.plateNumber}
        helperText={!!formik.errors.plateNumber ? formik.errors.plateNumber : ''}
        autoFocus
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Scan plate number
      </Button>
    </Box>
  );
}