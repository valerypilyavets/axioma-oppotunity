export interface FormSubmitCallback<T> {
  (values: T): void;
}

export interface FormProps<T> {
  submitCallback: FormSubmitCallback<T>;
  initialValues: T;
}

export enum ValidationMessages {
  REQUIRED_FIELD = 'This field is required',
  INVALID_PLATE_NUMBER = 'Plate number should be valid',
  INVALID_TOP_UP_AMOUNT = 'Top up amount should be positive',
}

export enum ErrorMessages {
  ACCOUNT_ALREADY_EXISTS = 'Account already exists',
  ACCOUNT_DO_NOT_EXISTS = 'Account do not exists',
  NOT_ENOUGH_BALANCE = 'Not enough balance',
}

export enum SuccessMessages {
  ACCOUNT_CREATED = 'Account successfully created',
  TOP_UP_COMPLETED = 'Top up completed',
  FEE_CHARGED = 'Fee charged',
}

export interface Account {
  accountName: string;
  plateNumber: string;
  balance: number;
  createdAt: string;
}

export interface AccountsState {
  accounts: Account[];
}

export interface TopUp {
  accountName: string;
  topUpAmount: number;
  createdAt: string;
}

export interface TopUpsState {
  topUps: TopUp[];
}