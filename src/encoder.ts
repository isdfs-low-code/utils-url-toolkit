export function encodeQueryParam(value: string): string {
  return encodeURIComponent(value);
}

export function decodeQueryParam(value: string): string {
  return decodeURIComponent(value);
}
