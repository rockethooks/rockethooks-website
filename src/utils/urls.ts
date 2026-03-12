/**
 * Builds a full webapp URL with optional path and query parameters.
 * Reads PUBLIC_APP_URL from environment at build time (Vite static replacement).
 * Falls back to production URL if env var is unset.
 */
export function getAppUrl(path = '/', params?: Record<string, string>): string {
  const raw = import.meta.env.PUBLIC_APP_URL || 'https://app.rockethooks.com';
  const origin = new URL(raw).origin;
  const url = new URL(path, origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}
