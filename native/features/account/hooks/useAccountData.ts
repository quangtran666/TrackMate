import { AccountDisplay, AccountGroup, AccountBalanceHeader } from "../types/account.types";

// Mock data utility - replace with actual data fetching logic
export const useAccountData = () => {
  // This would typically come from your API/state management
  const mockAccountGroups: AccountGroup[] = [
    {
      currency: "Euro",
      totalBalance: 10000,
      accounts: [
        {
          id: "1",
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        },
        {
          id: "2", 
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        }
      ]
    },
    {
      currency: "Euro",
      totalBalance: 10000,
      accounts: [
        {
          id: "3",
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        },
        {
          id: "4", 
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        }
      ]
    },
    {
      currency: "Euro",
      totalBalance: 10000,
      accounts: [
        {
          id: "5",
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        },
        {
          id: "6", 
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        }
      ]
    },
    {
      currency: "Euro",
      totalBalance: 10000,
      accounts: [
        {
          id: "7",
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        },
        {
          id: "8", 
          accountName: "Euro Account",
          accountType: "EUR",
          balance: 5000,
          currency: "EUR",
        }
      ]
    }
  ];

  const mockBalanceHeader: AccountBalanceHeader = {
    totalBalance: 10519.83,
    currency: "VND",
    formattedBalance: "10519.83 VND"
  };

  return {
    accountGroups: mockAccountGroups,
    balanceHeader: mockBalanceHeader,
    isLoading: false,
    error: null
  };
};
