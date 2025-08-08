import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AccountService } from '../services/account.service';
import { UpdateAccountRequest, UpdateAccountResponse } from '../types/api.types';
import { ApiError } from '@/services/api.types';
import { useAppToast } from '@/components/ui/toast/useAppToast';

export function useUpdateAccount(accountId: string): UseMutationResult<
  UpdateAccountResponse,
  ApiError,
  UpdateAccountRequest,
  unknown
> {
  const toast = useAppToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateAccountRequest) => {
      const result = await AccountService.updateAccount(accountId, payload);
      if (result.isErr()) throw result.error;
      return result.value;
    },
    onSuccess: (data) => {
      toast.showToast('Account updated', data.message, 'success');
      queryClient.invalidateQueries({ queryKey: ['accountGroups'] });
      queryClient.invalidateQueries({ queryKey: ['account', accountId] });
    },
    onError: (err: ApiError) => {
      toast.showToast('Failed to update account', err.message, 'error');
    },
  });
}


