export type AllKeys<U> = U extends any ? keyof U : never;
/**
 * useful for unions with optional properties. see example:
 * ```ts
 * type AllKeys<U> = U extends any ? keyof U : never
 * type ExclusifyUnion<U> = [U] extends [infer V] ?
 * V extends any ?
 * (V & {[P in Exclude<AllKeys<U>, keyof V>]?: never})
 * : never : never
 * type GoodItem = AbstractItem & GoodVariants;
 * type BadItem = AbstractItem & BadVariants;
 * type AbstractItem = { required: boolean };
 * type GoodVariants = ExclusifyUnion<VariantA | VariantB>;
 *  type BadVariants = VariantA | VariantB;
 * type VariantA = { foo?: number; foo2?: string }
 * type VariantB = { bar?: string; bar2?: number }
 * const item = {
 *   required: true,
 *   bar: 2
 * };
 * const bad: BadItem = item // No Error,
 * const good: GoodItem = item // desired Error
 * ```
 */
export type ExclusifyUnion<U> = [U] extends [infer V]
  ? V extends any
    ? (V & { [P in Exclude<AllKeys<U>, keyof V>]?: never })
    : never
  : never;

  export type PropsType<T> = T extends React.ComponentType<infer P> ? P : never;
