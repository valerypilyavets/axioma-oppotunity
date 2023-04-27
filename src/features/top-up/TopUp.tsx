import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TopUpPayload } from './topUpInterfaces';
import Typography from '@mui/material/Typography';
import { TopUpForm } from './components/TopUpForm';
import { selectAccounts, topUpAccount } from '../common/accountsSlice';
import { createTopUp } from '../common/topUpsSlice';
import { ErrorMessages, SuccessMessages } from '../common/commonInterfaces';
import Alert from '@mui/material/Alert';

export function TopUp() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);
  const [topUp, setTopUp] = useState({
    accountName: '',
    topUpAmount: 0,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (topUp.accountName && topUp.topUpAmount) {
      setErrorMessage('');
      setSuccessMessage('');

      if (accounts.find(item => item.accountName === topUp.accountName)) {
        dispatch(createTopUp(topUp));
        dispatch(topUpAccount(topUp));
        setSuccessMessage(SuccessMessages.TOP_UP_COMPLETED);
        setTopUp({ accountName: '', topUpAmount: 0 });
      } else {
        setErrorMessage(ErrorMessages.ACCOUNT_DO_NOT_EXISTS);
      }
    }
  }, [topUp]);

  const handleSubmit = (values: TopUpPayload) => {
    setTopUp(values);
  };

  return (
    <>
      <Typography component='h1' variant='h5' gutterBottom={true}>
        Top up account
      </Typography>
      <TopUpForm initialValues={topUp} submitCallback={handleSubmit} /><br />
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
    </>
  );
}
