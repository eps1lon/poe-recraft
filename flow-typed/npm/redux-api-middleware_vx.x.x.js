// flow-typed signature: c50ea2050777133754150855e048b6fd
// flow-typed version: <<STUB>>/redux-api-middleware_v^2.0.0-beta.3/flow_v0.53.1

import type { Middleware } from 'redux';

declare module 'redux-api-middleware' {
  declare var CALL_API: string;
  declare var RSAA: string;
  declare function isRSAA(): any;
  declare function validateRSAA(): any;
  declare function isValidRSAA(): any;
  declare type InvalidRSAA = Error;
  declare type InternalError = Error;
  declare type RequestError = Error;
  declare type ApiError = Error;
  declare function getJSON(): any;
  declare var apiMiddleware: Middleware;
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'redux-api-middleware/lib/errors' {
  declare module.exports: any;
}

declare module 'redux-api-middleware/lib/index' {
  declare module.exports: any;
}

declare module 'redux-api-middleware/lib/middleware' {
  declare module.exports: any;
}

declare module 'redux-api-middleware/lib/RSAA' {
  declare module.exports: any;
}

declare module 'redux-api-middleware/lib/util' {
  declare module.exports: any;
}

declare module 'redux-api-middleware/lib/validation' {
  declare module.exports: any;
}

// Filename aliases
declare module 'redux-api-middleware/lib/errors.js' {
  declare module.exports: $Exports<'redux-api-middleware/lib/errors'>;
}
declare module 'redux-api-middleware/lib/index.js' {
  declare module.exports: $Exports<'redux-api-middleware/lib/index'>;
}
declare module 'redux-api-middleware/lib/middleware.js' {
  declare module.exports: $Exports<'redux-api-middleware/lib/middleware'>;
}
declare module 'redux-api-middleware/lib/RSAA.js' {
  declare module.exports: $Exports<'redux-api-middleware/lib/RSAA'>;
}
declare module 'redux-api-middleware/lib/util.js' {
  declare module.exports: $Exports<'redux-api-middleware/lib/util'>;
}
declare module 'redux-api-middleware/lib/validation.js' {
  declare module.exports: $Exports<'redux-api-middleware/lib/validation'>;
}
