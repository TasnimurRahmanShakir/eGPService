import {
  ProblemDetails,
  ClientDto,
  ClientDetailDto,
  TenderDto,
  TenderDetailDto,
  TendererDto,
  AuditLogDto
} from './types';
import type {
  ClientCreateInput,
  ClientUpdateInput,
  ClientSubscriptionCreateInput,
  TenderCreateInput,
  TenderUpdateInput,
  TenderPaymentCreateInput,
  TendererAssignInput,
  TendererCreateInput
} from '@egp/schema';

export class ApiError extends Error {
  public status: number;
  public problemDetails?: ProblemDetails;

  constructor(status: number, message: string, problemDetails?: ProblemDetails) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.problemDetails = problemDetails;
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

export function createApiClient(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') {
  async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...rest } = options;

    let url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null) {
          searchParams.append(key, String(val));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json, application/problem+json',
      // Step 2: Mock Identity Bridge Header
      Authorization: 'Bearer mock-admin-token'
    };

    const res = await fetch(url, {
      ...rest,
      headers: {
        ...defaultHeaders,
        ...headers
      }
    });

    if (!res.ok) {
      let problemDetails: ProblemDetails | undefined;
      let errorMessage = `HTTP Request failed with status ${res.status}`;

      try {
        const data = await res.json();
        if (data && (data.title || data.detail || data.errors)) {
          problemDetails = data as ProblemDetails;
          errorMessage = problemDetails.detail || problemDetails.title || errorMessage;
        } else if (data && data.message) {
          errorMessage = data.message;
        }
      } catch {
        // Response was not JSON
      }

      throw new ApiError(res.status, errorMessage, problemDetails);
    }

    if (res.status === 204) {
      return {} as T;
    }

    return (await res.json()) as T;
  }

  return {
    clients: {
      getAll: (options?: RequestOptions) => request<ClientDto[]>('/clients', options),
      getById: (id: number, options?: RequestOptions) => request<ClientDetailDto>(`/clients/${id}`, options),
      create: (data: ClientCreateInput) =>
        request<number>('/clients', {
          method: 'POST',
          body: JSON.stringify(data)
        }),
      update: (id: number, data: ClientUpdateInput) =>
        request<void>(`/clients/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        }),
      addSubscription: (id: number, data: Omit<ClientSubscriptionCreateInput, 'clientId'>) =>
        request<{ subscriptionId: number; message: string }>(`/clients/${id}/subscriptions`, {
          method: 'POST',
          body: JSON.stringify(data)
        })
    },

    tenders: {
      getAll: (clientId?: number, options?: RequestOptions) =>
        request<TenderDto[]>('/tenders', {
          ...options,
          params: { ...options?.params, clientId }
        }),
      getById: (id: number, options?: RequestOptions) => request<TenderDetailDto>(`/tenders/${id}`, options),
      create: (data: TenderCreateInput) =>
        request<number>('/tenders', {
          method: 'POST',
          body: JSON.stringify(data)
        }),
      update: (id: number, data: TenderUpdateInput) =>
        request<void>(`/tenders/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        }),
      addPayment: (id: number, data: Omit<TenderPaymentCreateInput, 'tenderId'>) =>
        request<{ paymentId: number; message: string }>(`/tenders/${id}/payments`, {
          method: 'POST',
          body: JSON.stringify(data)
        }),
      mapTenderers: (id: number, data: TendererAssignInput) =>
        request<{ message: string }>(`/tenders/${id}/tenderers`, {
          method: 'POST',
          body: JSON.stringify(data)
        })
    },

    tenderers: {
      getAll: (options?: RequestOptions) => request<TendererDto[]>('/tenderers', options),
      create: (data: TendererCreateInput) =>
        request<number>('/tenderers', {
          method: 'POST',
          body: JSON.stringify(data)
        })
    },

    auditLogs: {
      getLogs: (params?: { moduleName?: string; recordId?: number; pageNumber?: number; pageSize?: number }, options?: RequestOptions) =>
        request<AuditLogDto[]>('/auditlogs', {
          ...options,
          params: { ...options?.params, ...params }
        })
    }
  };
}

export const apiClient = createApiClient();
