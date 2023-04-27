export interface TopUpPayload {
  accountName: string;
  topUpAmount: number;
}

export interface TopUpErrors {
  accountName?: string;
  topUpAmount?: string;
}