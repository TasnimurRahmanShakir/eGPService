export function formatErrorMessage(error: any, fallback: string): string {
  if (error?.problemDetails?.errors && Object.keys(error.problemDetails.errors).length > 0) {
    return Object.entries(error.problemDetails.errors)
      .map(([f, errs]: [string, any]) => `${f}: ${Array.isArray(errs) ? errs.join(', ') : errs}`)
      .join('; ');
  }
  return (
    error?.problemDetails?.detail ||
    error?.problemDetails?.title ||
    error?.message ||
    fallback
  );
}
