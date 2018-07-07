export const anySet = (obj: {} | undefined) =>
  Object.values(obj || {}).some(Boolean);
// a dummy Flags object that evaluates anySet to true
export const falseFlags = () => ({ false_flag: true });
export const isDisabled = (details: { applicable?: {}; spawnable?: {} }) =>
  anySet(details.applicable) || anySet(details.spawnable);
