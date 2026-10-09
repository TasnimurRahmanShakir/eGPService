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

export const getBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    return process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5276/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5276/api';
};

export function createApiClient(customBaseUrl?: string) {
  const resolveBaseUrl = () => customBaseUrl || getBaseUrl();

  async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...rest } = options;
    const baseUrl = resolveBaseUrl();

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
      return { ok: true } as unknown as T;
    }

    const data = await res.json();
    if (typeof data === 'object' && data !== null && !('ok' in data)) {
      (data as any).ok = true;
    }
    return data as T;
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
        request<{ subscriptionId: number; message: string; ok: boolean }>(`/clients/${id}/subscriptions`, {
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
      addPayment: (
        idOrData: number | TenderPaymentCreateInput,
        maybeData?: Omit<TenderPaymentCreateInput, 'tenderId'>
      ) => {
        if (typeof idOrData === 'number') {
          return request<{ paymentId: number; message: string; ok: boolean }>(`/tenders/${idOrData}/payments`, {
            method: 'POST',
            body: JSON.stringify(maybeData)
          });
        }
        const { tenderId, ...data } = idOrData;
        return request<{ paymentId: number; message: string; ok: boolean }>(`/tenders/${tenderId}/payments`, {
          method: 'POST',
          body: JSON.stringify(data)
        });
      },
      mapTenderers: (id: number, data: any) =>
        request<{ message: string }>(`/tenders/${id}/tenderers`, {
          method: 'POST',
          body: JSON.stringify(data)
        }),
      addTenderer: (id: number, data: any) =>
        request<{ mappingId: number; message: string; ok: boolean }>(`/tenders/${id}/tenderers`, {
          method: 'POST',
          body: JSON.stringify(data)
        }),
      updateTenderer: (id: number, tendererId: number, data: any) =>
        request<{ message: string; ok: boolean }>(`/tenders/${id}/tenderers/${tendererId}`, {
          method: 'PUT',
          body: JSON.stringify(data)
        }),
      removeTenderer: (id: number, tendererId: number) =>
        request<{ message: string; ok: boolean }>(`/tenders/${id}/tenderers/${tendererId}`, {
          method: 'DELETE'
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
      getLogs: (params?: { moduleName?: string; recordId?: number; pageNumber?: number; pageSize?: number; cursor?: number }, options?: RequestOptions) =>
        request<AuditLogDto[]>('/auditlogs', {
          ...options,
          params: { ...options?.params, ...params }
        })
    }
  };
}

export const apiClient = createApiClient();
