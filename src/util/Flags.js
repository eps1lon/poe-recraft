// @flow

/**
 
type BaseFlag = "one";

type BaseFlags = Flags<BaseFlag>;

const flags: BaseFlags = {
	one: true, // ok
  two: false, // Error! property `three` is a string. This type is incompatible with string enum
  one: 1, // Error! This type is incompatible with boolean
};

Extension
type ExtendedFlag = BaseFlag | "two";

type ExtendedFlags = BaseFlags | Flags<BaseFlag>; // Flags<ExtendedFlag> polymorphic error!

 */

export type Flags<T> = {
  [T]: boolean,
};

export const anySet = (flags: Flags<*>, whitelist: any[] = []) => {
  // ignore every key in which is in whitelist and no flag set (===true)
  return Object.entries(flags).some(
    ([key, value]) => !whitelist.includes(key) && value,
  );
};
