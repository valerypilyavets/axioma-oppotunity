import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { TopUpsState } from './commonInterfaces';
import { TopUpPayload } from '../top-up/topUpInterfaces';
import moment from 'moment/moment';

const initialState: TopUpsState = {
  topUps: [],
};

export const topUpsSlice = createSlice({
  name: 'topUps',
  initialState,
  reducers: {
    createTopUp: (state, action: PayloadAction<TopUpPayload>) => {
      const topUp = {
        createdAt: moment().format('DD-MM-YYYY'),
        ...action.payload,
      };
      state.topUps.push(topUp);
    },
  },
});

export const { createTopUp } = topUpsSlice.actions;

export const selectTopUps = (state: RootState) => state.topUps.topUps;

export default topUpsSlice.reducer;
