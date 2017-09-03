// @flow
declare type ActionType = string;

declare type Payload = any;

declare type Meta = {};

declare type Action = {
  type: ActionType,
  payload?: Payload,
  meta?: Meta
};
