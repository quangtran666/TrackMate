import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AccountService } from '../services/account.service';
import { CreateAccountRequest, CreateAccountResponse, ApiError } from '../types/api.types';
import { useAppToast } from '@/components/ui/toast/useAppToast';

export function useCreateAccount(): UseMutationResult<
  CreateAccountResponse,
  ApiError,
  CreateAccountRequest,
  unknown
> {
  const toast = useAppToast();

  return useMutation({
    mutationFn: async (request: CreateAccountRequest) => {
      const result = await AccountService.createAccount(request);
      if (result.isErr()) {
        throw result.error;
      }
      return result.value;
    },
    onSuccess: (data) => {
      toast.showToast("Account created successfully", data.message, 'success');
    },
    onError: (error: ApiError) => {
      toast.showToast("Failed to create account", error.message, 'error');
    },
  });
}