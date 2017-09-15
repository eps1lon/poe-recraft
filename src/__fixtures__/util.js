export const findBy = key => (haystack, needle) =>
  haystack.find(({ [key]: value }) => value === needle);

export const findByPrimary = findBy('primary');
