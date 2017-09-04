// @flow
import type ModGenerator from '../poe/ModGenerator/';

export const SET_GENERATOR = 'CRAFT/SET_GENERATOR';

export type SetGeneratorAction = {
  type: 'CRAFT/SET_GENERATOR',
  payload: ModGenerator<*>
};
export function setGenerator(generator: ModGenerator<*>): SetGeneratorAction {
  return {
    type: SET_GENERATOR,
    payload: generator
  };
}

export type Action = SetGeneratorAction;
