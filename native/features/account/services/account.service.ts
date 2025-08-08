import { ResultAsync, Result } from 'neverthrow';
import api from '../../../services/api';
import { CreateAccountRequest, CreateAccountResponse, AccountGroupsResponse, DeleteAccountResponse, UpdateAccountRequest, UpdateAccountResponse, GetAccountResponse } from '../types/api.types';
import { ApiError } from '@/services/api.types';

export class AccountService {
  static createAccount(request: CreateAccountRequest): ResultAsync<CreateAccountResponse, ApiError> {
    return ResultAsync.fromPromise(
      api.post('/accounts', request),
      (error) => this.mapApiError(error)
    );
  }

  static getAccountGroups(): ResultAsync<AccountGroupsResponse, ApiError> {
    return ResultAsync.fromPromise(
      api.get('/accounts/groups'),
      (error) => this.mapApiError(error)
    );
  }

  static deleteAccount(accountId: string): ResultAsync<DeleteAccountResponse, ApiError> {
    return ResultAsync.fromPromise(
      api.delete(`/accounts/${accountId}`),
      (error) => this.mapApiError(error)
    );
  }

  static getAccountById(accountId: string): ResultAsync<GetAccountResponse, ApiError> {
    return ResultAsync.fromPromise(
      api.get(`/accounts/${accountId}`),
      (error) => this.mapApiError(error)
    );
  }

  static updateAccount(accountId: string, request: UpdateAccountRequest): ResultAsync<UpdateAccountResponse, ApiError> {
    return ResultAsync.fromPromise(
      api.put(`/accounts/${accountId}`, request),
      (error) => this.mapApiError(error)
    );
  }

  private static mapApiError(error: any): ApiError {
    return {
      message: error.response?.data?.message || 'An unexpected error occurred',
      code: error.response?.data?.code,
      details: error.response?.data?.details
    };
  }
}