import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PlateScannerPayload } from './plateScannerInterfaces';
import { PlateScannerForm } from './components/PlateScannerForm';
import { chargeFee, selectAccounts } from '../common/accountsSlice';
import { ErrorMessages, SuccessMessages } from '../common/commonInterfaces';
import Alert from '@mui/material/Alert';

export function PlateScanner() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(selectAccounts);
  const [plate, setPlate] = useState({
    plateNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    if (plate.plateNumber) {
      setErrorMessage('');
      setSuccessMessage('');
      const foundAccount = accounts.find(item => item.plateNumber === plate.plateNumber);
      if (foundAccount) {
        if (foundAccount.balance >= 1) {
          dispatch(chargeFee(plate));
          setSuccessMessage(SuccessMessages.FEE_CHARGED);
        } else {
          setErrorMessage(ErrorMessages.NOT_ENOUGH_BALANCE);
        }
      } else {
        setErrorMessage(ErrorMessages.ACCOUNT_DO_NOT_EXISTS);
      }
    }
  }, [plate]);

  const handleSubmit = (values: PlateScannerPayload) => {
    setPlate(values);
  };

  return (
    <>
      <Typography component='h1' variant='h5' gutterBottom={true}>
        Scan licence plate
      </Typography>
      <PlateScannerForm initialValues={plate} submitCallback={handleSubmit} />
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
    </>
  );
}
