import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { AccountService } from '../services/account.service';
import { DeleteAccountResponse } from '../types/api.types';
import { ApiError } from '@/services/api.types';
import { useAppToast } from '@/components/ui/toast/useAppToast';

export function useDeleteAccount(): UseMutationResult<
  DeleteAccountResponse,
  ApiError,
  { accountId: string },
  unknown
> {
  const toast = useAppToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ accountId }: { accountId: string }) => {
      const result = await AccountService.deleteAccount(accountId);
      if (result.isErr()) {
        throw result.error;
      }
      return result.value;
    },
    onSuccess: (data) => {
      toast.showToast('Account deleted', data.message, 'success');
      queryClient.invalidateQueries({ queryKey: ['accountGroups'] });
    },
    onError: (error: ApiError) => {
      toast.showToast('Failed to delete account', error.message, 'error');
    },
  });
}


