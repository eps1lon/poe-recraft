// @flow
export const anySet = (obj: ?{}) => Object.values(obj || {}).some(Boolean);
export const disabled = (details: { applicable?: {}, spawnable?: {} }) =>
  anySet(details.applicable) || anySet(details.spawnable);
