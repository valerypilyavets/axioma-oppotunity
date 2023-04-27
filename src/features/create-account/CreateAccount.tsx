import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CreateAccountPayload } from './createAccountInterfaces';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { CreateAccountForm } from './components/CreateAccountForm';
import { createAccount, selectAccounts } from '../common/accountsSlice';
import { ErrorMessages, SuccessMessages } from '../common/commonInterfaces';

export function CreateAccount() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);
  const [account, setAccount] = useState({
    accountName: '',
    plateNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (account.accountName && account.plateNumber) {
      setErrorMessage('');
      setSuccessMessage('');
      if (!accounts.find(item => item.accountName === account.accountName)) {
        dispatch(createAccount(account));
        setSuccessMessage(SuccessMessages.ACCOUNT_CREATED);
      } else {
        setErrorMessage(ErrorMessages.ACCOUNT_ALREADY_EXISTS);
      }
    }
  }, [account]);

  const handleSubmit = (values: CreateAccountPayload) => {
    setAccount(values);
  };

  return (
    <>
      <Typography component='h1' variant='h5' gutterBottom={true}>
        Create account
      </Typography>
      <CreateAccountForm initialValues={account} submitCallback={handleSubmit} /><br />
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
    </>
  );
}