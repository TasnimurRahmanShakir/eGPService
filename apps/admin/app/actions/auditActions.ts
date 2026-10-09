'use server';

import { apiClient, type AuditLogDto } from '@egp/api-client';

export async function fetchAuditLogsAction(params?: {
  moduleName?: string;
  cursor?: number;
  pageSize?: number;
}): Promise<{ success: boolean; data: AuditLogDto[]; message?: string }> {
  try {
    const logs = await apiClient.auditLogs.getLogs(
      {
        moduleName: params?.moduleName && params.moduleName !== 'ALL' ? params.moduleName : undefined,
        cursor: params?.cursor,
        pageSize: params?.pageSize ?? 15,
      },
      {
        next: { revalidate: 0 },
      }
    );
    return { success: true, data: logs };
  } catch (err: any) {
    console.error('[fetchAuditLogsAction] Error:', err);
    return { success: false, data: [], message: err.message || 'Failed to fetch audit logs' };
  }
}
