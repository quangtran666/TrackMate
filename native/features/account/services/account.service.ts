import { ResultAsync, Result } from 'neverthrow';
import api from '../../../services/api';
import { CreateAccountRequest, CreateAccountResponse, ApiError } from '../types/api.types';

export class AccountService {
  static createAccount(request: CreateAccountRequest): ResultAsync<CreateAccountResponse, ApiError> {
    return ResultAsync.fromPromise(
      api.post('/accounts', request),
      (error) => this.mapApiError(error)
    ).map(response => response.data);
  }

  private static mapApiError(error: any): ApiError {
    return {
      message: error.response?.data?.message || 'An unexpected error occurred',
      code: error.response?.data?.code,
      details: error.response?.data?.details
    };
  }
}