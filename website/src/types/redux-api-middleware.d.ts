// source: https://raw.githubusercontent.com/mosen/commandment/master/ui/src/typings/redux-api-middleware.d.ts
// related: agraboso/redux-api-middleware#93
declare module 'redux-api-middleware' {
  import { Action, AnyAction, Dispatch, Middleware } from 'redux';

  /**
   * Symbol key that carries API call info interpreted by this Redux middleware.
   *
   * @constant {string}
   * @access public
   * @default
   */
  export const RSAA: 'rsaa';

  //// ERRORS

  /**
   * Error class for an RSAA that does not conform to the RSAA definition
   *
   * @class InvalidRSAA
   * @access public
   * @param {array} validationErrors - an array of validation errors
   */
  export class InvalidRSAA {
    public name: string;
    public message: string;
    public validationErrors: string[];

    constructor(validationErrors: string[]);
  }

  /**
   * Error class for a custom `payload` or `meta` function throwing
   *
   * @class InternalError
   * @access public
   * @param {string} message - the error message
   */
  export class InternalError {
    public name: string;
    public message: string;

    constructor(message: string);
  }

  /**
   * Error class for an error raised trying to make an API call
   *
   * @class RequestError
   * @access public
   * @param {string} message - the error message
   */
  export class RequestError {
    public name: string;
    public message: string;

    constructor(message: string);
  }

  /**
   * Error class for an API response outside the 200 range
   *
   * @class ApiError
   * @access public
   * @param {number} status - the status code of the API response
   * @param {string} statusText - the status text of the API response
   * @param {object} response - the parsed JSON response of the API server if the
   *  'Content-Type' header signals a JSON response
   */
  export class ApiError {
    public name: string;
    public message: string;
    public status: number;
    public statusText: string;
    public response?: any;

    constructor(status: number, statusText: string, response: any);
  }

  //// VALIDATION

  /**
   * Is the given action a plain JavaScript object with a [RSAA] property?
   */
  export function isRSAA(action: object): action is RSAAction<any, any, any>;

  export interface TypeDescriptor<TSymbol> {
    type: string | TSymbol;
    payload: any;
    meta: any;
  }

  /**
   * Is the given object a valid type descriptor?
   */
  export function isValidTypeDescriptor(
    obj: object,
  ): obj is TypeDescriptor<any>;

  /**
   * Checks an action against the RSAA definition, returning a (possibly empty)
   * array of validation errors.
   */
  function validateRSAA(action: object): string[];

  /**
   * Is the given action a valid RSAA?
   */
  function isValidRSAA(action: object): boolean;

  //// MIDDLEWARE

  /**
   * A Redux middleware that processes RSAA actions.
   */
  export const apiMiddleware: ApiMiddleware;

  //// UTIL

  /**
   * Extract JSON body from a server response
   */
  export function getJSON(res: Response): PromiseLike<any> | undefined;

  export type RSAActionTypeTuple = [
    string | symbol,
    string | symbol,
    string | symbol
  ];

  /**
   * Blow up string or symbol types into full-fledged type descriptors,
   *   and add defaults
   */
  export function normalizeTypeDescriptors(
    types: RSAActionTypeTuple,
  ): RSAActionTypeTuple;

  export type HTTPVerb =
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'OPTIONS';

  export interface RSAAction<R, S, F> {
    [RSAA]: {
      // Symbol as object key seems impossible
      endpoint: (state: any) => string | string; // or function
      method: HTTPVerb;
      body?: any;
      headers?: { [propName: string]: string }; // or function
      credentials?: 'omit' | 'same-origin' | 'include';
      bailout?: boolean; // or function
      types: [R, S, F];
    };
  }

  interface ApiDispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T;
    <R, S, F>(rsaa: RSAAction<R, S, F>): TypeDescriptor<any>;
  }
  export type ApiMiddleware = Middleware<ApiDispatch>;
}
