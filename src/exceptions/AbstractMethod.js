// @flow
export default class AbstractMethod extends Error {
  constructor(method: string) {
    super(`override abstract method ${method}`);
  }
}
