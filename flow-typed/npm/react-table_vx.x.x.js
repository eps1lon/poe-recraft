import type { Component } from 'react';

declare module 'react-table' {
  declare type Accessor = string | (() => any);

  declare type Column = {
    accessor?: Accessor,
    className?: string,
    Header?: string, // TODO node
    id?: ColumnId
  };

  declare type ColumnId = string;

  declare type PropsGetter<T> = (State, ?RowInfo<T>) => any;

  declare type Props<T> = {
    className?: string,
    columns?: Column[],
    data?: T[],
    defaultSorted: ColumnId[],
    minRows?: number,
    showPagination?: boolean,
    getTrProps?: PropsGetter<T>
  };

  declare type RowInfo<T> = {
    original: T
  };

  declare type State = {};

  declare type ReactTable<T> = Component<Props<T>, State>;

  declare module.exports: ReactTable<*>;
}

/**
 * We include stubs for each file inside this npm package in case you need to
 * require those files directly. Feel free to delete any files that aren't
 * needed.
 */
declare module 'react-table/lib/defaultProps' {
  declare module.exports: any;
}

declare module 'react-table/lib/index' {
  declare module.exports: any;
}

declare module 'react-table/lib/lifecycle' {
  declare module.exports: any;
}

declare module 'react-table/lib/methods' {
  declare module.exports: any;
}

declare module 'react-table/lib/pagination' {
  declare module.exports: any;
}

declare module 'react-table/lib/utils' {
  declare module.exports: any;
}

declare module 'react-table/react-table' {
  declare module.exports: any;
}

declare module 'react-table/src/defaultProps' {
  declare module.exports: any;
}

declare module 'react-table/src/index' {
  declare module.exports: any;
}

declare module 'react-table/src/lifecycle' {
  declare module.exports: any;
}

declare module 'react-table/src/methods' {
  declare module.exports: any;
}

declare module 'react-table/src/pagination' {
  declare module.exports: any;
}

declare module 'react-table/src/utils' {
  declare module.exports: any;
}

// Filename aliases
declare module 'react-table/lib/defaultProps.js' {
  declare module.exports: $Exports<'react-table/lib/defaultProps'>;
}
declare module 'react-table/lib/index.js' {
  declare module.exports: $Exports<'react-table/lib/index'>;
}
declare module 'react-table/lib/lifecycle.js' {
  declare module.exports: $Exports<'react-table/lib/lifecycle'>;
}
declare module 'react-table/lib/methods.js' {
  declare module.exports: $Exports<'react-table/lib/methods'>;
}
declare module 'react-table/lib/pagination.js' {
  declare module.exports: $Exports<'react-table/lib/pagination'>;
}
declare module 'react-table/lib/utils.js' {
  declare module.exports: $Exports<'react-table/lib/utils'>;
}
declare module 'react-table/react-table.js' {
  declare module.exports: $Exports<'react-table/react-table'>;
}
declare module 'react-table/src/defaultProps.js' {
  declare module.exports: $Exports<'react-table/src/defaultProps'>;
}
declare module 'react-table/src/index.js' {
  declare module.exports: $Exports<'react-table/src/index'>;
}
declare module 'react-table/src/lifecycle.js' {
  declare module.exports: $Exports<'react-table/src/lifecycle'>;
}
declare module 'react-table/src/methods.js' {
  declare module.exports: $Exports<'react-table/src/methods'>;
}
declare module 'react-table/src/pagination.js' {
  declare module.exports: $Exports<'react-table/src/pagination'>;
}
declare module 'react-table/src/utils.js' {
  declare module.exports: $Exports<'react-table/src/utils'>;
}
