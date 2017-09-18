// @flow
import { Generator } from 'poe-mods';

export const SET_GENERATOR = 'CRAFT/SET_GENERATOR';

export type SetGeneratorAction = {
  type: 'CRAFT/SET_GENERATOR',
  payload: Generator<*>
};
export function setGenerator(generator: Generator<*>): SetGeneratorAction {
  return {
    type: SET_GENERATOR,
    payload: generator
  };
}

export type Action = SetGeneratorAction;
