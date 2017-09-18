// @flow
import type { Generator as ModGenerator } from 'poe-mods/lib/generators';

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
