import { ReactNode } from 'react';

export interface Column<T> {
  id: string;
  className: string;
  renderHeader: () => ReactNode;
  renderCell: (data: T) => ReactNode;
}
