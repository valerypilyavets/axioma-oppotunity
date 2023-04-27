import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountsReducer from '../features/common/accountsSlice';
import topUpsReducer from '../features/common/topUpsSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    topUps: topUpsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
