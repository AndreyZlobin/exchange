export const createResponseErrorInfo = <T>(
  url: string,
  ok: boolean,
  status: number,
  statusText: string,
  body: T,
) => {
  return { url, ok, status, statusText, body };
};
