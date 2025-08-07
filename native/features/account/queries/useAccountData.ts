import { useQueries } from '@tanstack/react-query';
import { AccountGroup, AccountBalanceHeader } from "../types/account.types";
import { AccountService } from '../services/account.service';
import { AccountGroupsResponse } from '../types/api.types';
import { ApiError } from '@/services/api.types';
import { useAppToast } from '@/components/ui/toast/useAppToast';

const createMockBalanceHeader = (): AccountBalanceHeader => ({
  totalBalance: 10519.83,
  currency: "VND",
  formattedBalance: "10519.83 VND"
});

export const useAccountData = () => {
  const toast = useAppToast();
  
  const [accountGroupsQuery, balanceHeaderQuery] = useQueries({
    queries: [
      {
        queryKey: ['accountGroups'],
        queryFn: async (): Promise<AccountGroup[]> => {
          const result = await AccountService.getAccountGroups();
          if (result.isErr()) {
            throw result.error;
          }
          return result.value.data;
        },
      },
      {
        queryKey: ['balanceHeader'],
        queryFn: async (): Promise<AccountBalanceHeader> => {
          await new Promise(resolve => setTimeout(resolve, 100));
          return createMockBalanceHeader();
        },
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  if (accountGroupsQuery.error) {
    toast.showToast("Failed to fetch account groups", (accountGroupsQuery.error as ApiError).message, 'error');
  }

  const accountGroups: AccountGroup[] = accountGroupsQuery.data || [];
  const balanceHeader: AccountBalanceHeader = balanceHeaderQuery.data || createMockBalanceHeader();
  const isLoading = accountGroupsQuery.isLoading || balanceHeaderQuery.isLoading;
  const error = accountGroupsQuery.error || balanceHeaderQuery.error || null;
  return {
    accountGroups,
    balanceHeader,
    isLoading,
    error
  };
};
