import { useQuery } from '@tanstack/react-query';
import { Account } from '../types/account.types';
import { AccountService } from '../services/account.service';
import { ApiError } from '@/services/api.types';

export function useAccountById(accountId: string | undefined) {
  return useQuery<Account, ApiError>({
    queryKey: ['account', accountId],
    enabled: !!accountId,
    queryFn: async () => {
      const result = await AccountService.getAccountById(accountId!);
      if (result.isErr()) throw result.error;
      return result.value.data;
    },
  });
}


