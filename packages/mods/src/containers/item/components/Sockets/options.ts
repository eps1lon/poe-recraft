// declarations for option parameters in Socket member functions
import Item from '../../Item';
import { Socket, SocketId, SocketColor } from './types';

export interface SocketOptions {
  keep_links: boolean;
  newSocket: (item: Item, index: number) => Socket;
  force: boolean;
}

export interface ColorBatch {
  sockets: SocketId[];
  color: SocketColor;
}
