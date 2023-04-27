import { FormProps, ValidationMessages } from '../../common/commonInterfaces';
import { TopUpErrors, TopUpPayload } from '../topUpInterfaces';

import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';

export function TopUpForm(props: FormProps<TopUpPayload>) {
  const { submitCallback, initialValues } = props;
  const validate = (values: TopUpPayload) => {
    const errors: TopUpErrors = {};
    if (!values.accountName) {
      errors.accountName = ValidationMessages.REQUIRED_FIELD;
    }
    if (values.topUpAmount <= 0) {
      errors.topUpAmount = ValidationMessages.INVALID_TOP_UP_AMOUNT;
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
        id='accountName'
        label='Account name'
        name='accountName'
        onChange={formik.handleChange}
        value={formik.values.accountName}
        error={!!formik.errors.accountName}
        helperText={!!formik.errors.accountName ? formik.errors.accountName : ''}
        autoFocus
      />
      <TextField
        type='number'
        margin='normal'
        required
        fullWidth
        id='topUpAmount'
        label='Top up amount'
        name='topUpAmount'
        onChange={formik.handleChange}
        value={formik.values.topUpAmount}
        error={!!formik.errors.topUpAmount}
        helperText={!!formik.errors.topUpAmount ? formik.errors.topUpAmount : ''}
      />
      <Button
        type='submit'
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Top up
      </Button>
    </Box>
  );
}