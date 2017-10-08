// @flow

export type NormalClause<T> = T[][];

// ([[a, b], c], D) => (a in D or b in D) and c in D
export const checkCnf = <T>(formular: NormalClause<T>, domain: T[]) =>
  formular.every(clause => clause.some(atom => domain.includes(atom)));
