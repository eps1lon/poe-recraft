export enum SocketColor {
  red = 'r',
  blue = 'b',
  green = 'g',
  white = 'w',
  abyss = 'a',
}
export type SocketId = number;
export interface Socket {
  color: SocketColor;
}
export type SocketGroup = SocketId[];
