import { Generator, Item, Mod } from 'poe-mods';
import { Action, NullableAction } from 'util/redux';

export enum Type {
  SET_GENERATOR = 'CRAFT/SET_GENERATOR',
  USE_GENERATOR = 'CRAFT/USE_GENERATOR',
  APPLY_GENERATOR = 'CRAFT/APPLY_GENERATOR'
}

export type Action =
  | UseGeneratorAction
  | ApplyGeneratorAction
  | SetGeneratorAction;

export type DefaultGenerator = Generator<Mod, Item>;

export type SetGeneratorAction = Action<Type.SET_GENERATOR, DefaultGenerator>;
export const setGenerator = (
  generator: DefaultGenerator
): SetGeneratorAction => ({
  type: Type.SET_GENERATOR,
  payload: generator
});

export type UseGeneratorAction = Action<Type.USE_GENERATOR, string>;
export const useGenerator = (type: string): UseGeneratorAction => ({
  type: Type.USE_GENERATOR,
  payload: type
});

export type ApplyGeneratorAction = NullableAction<Type.APPLY_GENERATOR>;
export const applyGenerator = (): ApplyGeneratorAction => ({
  type: Type.APPLY_GENERATOR
});
