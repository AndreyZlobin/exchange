import { createSearchParams } from 'react-router-dom';

export const searchParamsCreator = (params: Record<string, string | string[]>) => {
  return createSearchParams(params).toString();
};
