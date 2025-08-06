export interface Account {
  id: string;
  user_id: string;
  account_name: string;
  account_type: string;
  balance: Balance;
  is_active: boolean;
  stats: AccountStats;
  created_at: string;
  updated_at: string;
}

export interface Balance {
  amount: number;
  currency: string;
}

export interface AccountStats {
  total_income: number;
  total_expense: number;
  transactions_count: number;
  last_transaction_date?: string;
}

// Display types for UI components
export interface AccountDisplay {
  id: string;
  accountName: string;
  accountType: string;
  balance: number;
  currency: string;
  icon: string;
  color: string;
}

export interface AccountGroup {
  currency: string;
  currencySymbol: string;
  accounts: AccountDisplay[];
  totalBalance: number;
}

export interface AccountBalanceHeader {
  totalBalance: number;
  currency: string;
  formattedBalance: string;
}