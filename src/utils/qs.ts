type Qs = (params: { [key: string]: unknown }) => string;

export const createQS: Qs = (params) => {
  const preparedParams = Object.entries(params).map(([key, value]) => {
    if (!value) {
      return '';
    }

    if (Array.isArray(value)) {
      return value.reduce((acc, curr) => `${acc}&${key}=${curr}`, '').slice(1);
    }

    return `${key}=${value}`;
  });

  const paramsStr = preparedParams.filter(Boolean).join('&');

  return paramsStr ? `?${paramsStr}` : '';
};
