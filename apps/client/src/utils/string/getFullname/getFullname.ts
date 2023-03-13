const hasParam = (param: string | undefined) => {
  return param ? ` ${param}` : null;
};

type GetFullName = (name?: string, middlename?: string | null, lastname?: string) => string;

export const getFullName: GetFullName = (name, middlename, lastname) => {
  const innerName = hasParam(name) || '';
  const innerMiddlename = hasParam(middlename || '') || '';
  const innerLastname = hasParam(lastname)?.trim() || '';

  return `${innerLastname}${innerName}${innerMiddlename}`;
};

export const getShortFullName: GetFullName = (name, middlename, lastname) => {
  const innerName = name?.trim()?.at(0) || '';
  const innerMiddlename = middlename?.trim()?.at(0) || '';
  const innerLastname = lastname?.trimStart() || '';

  return `${innerLastname + ' '}${innerName ? innerName + '.' : ''}${
    innerMiddlename ? innerMiddlename + '.' : ''
  }`;
};
