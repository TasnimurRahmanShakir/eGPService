export function formatErrorMessage(error: any, fallback: string): string {
  if (error?.problemDetails?.errors && Object.keys(error.problemDetails.errors).length > 0) {
    return Object.entries(error.problemDetails.errors)
      .map(([f, errs]: [string, any]) => `${f}: ${Array.isArray(errs) ? errs.join(', ') : errs}`)
      .join('; ');
  }

  const rawMessage =
    error?.problemDetails?.detail ||
    error?.problemDetails?.title ||
    error?.message;

  if (rawMessage === 'fetch failed' || rawMessage?.toLowerCase().includes('fetch failed')) {
    const cause = error?.cause?.message || error?.cause?.code || '';
    return `Cannot connect to Backend API${cause ? ` (${cause})` : ''}. Please check your API URL configuration.`;
  }

  return rawMessage || fallback;
}
