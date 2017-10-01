import { AnyValue, Matcher, Range, Value } from '../StatDescription';

const isRange = (matcher: Matcher): matcher is Range =>
  Array.isArray(matcher) && matcher.length === 2;

export function matchesSingle(matcher, arg: number): boolean {
  return matches([matcher], [arg]);
}

export function matches(matchers: Matcher[], args: number[]) {
  return matchers.every((matcher, i) => match(matcher, args[i]));
}

function match(matcher: Matcher, target: number | undefined): boolean {
  if (target === undefined) {
    return false;
  }

  if (isRange(matcher)) {
    return matchRange(matcher, target);
  } else {
    return matchValue(matcher, target);
  }
}

function matchRange(range: Range, target: number): boolean {
  return lowerBound(range[0], target) && upperBound(range[1], target);
}

function matchValue(value: Value, target: number): boolean {
  if (isAnyValue(value)) {
    return true;
  } else {
    return value === target;
  }
}

function lowerBound(value: Value, target: number): boolean {
  if (isAnyValue(value)) {
    return true;
  } else {
    return value <= target;
  }
}

function upperBound(value: Value, target: number): boolean {
  if (isAnyValue(value)) {
    return true;
  } else {
    return target <= value;
  }
}

function isAnyValue(value: Value): value is AnyValue {
  return value === '#';
}
