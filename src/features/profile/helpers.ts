const checkIsFieldsChanged = <Fields extends object>(
  initial: Fields,
  current: Fields,
): boolean => {
  const entries = Object.entries(current) as Entries<Fields>;
  return entries.some(
    ([fieldName, fieldValue]) => initial[fieldName] !== fieldValue,
  );
};

export const helpersProfile = {
  checkIsFieldsChanged,
};
