import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AccountsState } from './commonInterfaces';
import { CreateAccountPayload } from '../create-account/createAccountInterfaces';
import { TopUpPayload } from '../top-up/topUpInterfaces';
import moment from 'moment/moment';
import { PlateScannerPayload } from '../plate-scanner/plateScannerInterfaces';

const initialState: AccountsState = {
  accounts: [],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    createAccount: (state, action: PayloadAction<CreateAccountPayload>) => {
      const account = {
        balance: 0,
        createdAt: moment().format('DD-MM-YYYY'),
        ...action.payload,
      };
      state.accounts.push(account);
    },
    topUpAccount: (state, action: PayloadAction<TopUpPayload>) => {
      const account = state.accounts.find(item => item.accountName === action.payload.accountName);
      if (account) {
        account.balance += action.payload.topUpAmount;
      }
    },
    chargeFee: (state, action: PayloadAction<PlateScannerPayload>) => {
      const account = state.accounts.find(item => item.plateNumber === action.payload.plateNumber);
      if (account) {
        account.balance -= 1;
      }
    },
  },
});

export const { createAccount, topUpAccount, chargeFee } = accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts.accounts;

export default accountsSlice.reducer;
