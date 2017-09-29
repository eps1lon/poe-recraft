// @flow
import { Generator } from 'poe-mods';
import { createAction, type ReduxActionType } from 'redux-actions';

export const SET_GENERATOR = 'CRAFT/SET_GENERATOR';

export const setGenerator = createAction(
  'CRAFT/SET_GENERATOR',
  (generator: Generator<*, *>) => generator
);
export type SetGeneratorAction = ReduxActionType<typeof setGenerator>;

export type Action = SetGeneratorAction;
