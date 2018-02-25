import { Translation } from '../types/StatDescription';

export type Boundary = number | '#';
export type BoundedRange = [Boundary, Boundary];
export type Value = Boundary | BoundedRange;

type Range = [number, number];

// types of interval overlap
export enum Match {
  exact, // A = B
  subset, // A \subseteq B
  superset, // A \supseteq B
  partial_upper, // forall x in A and x in B: forall y in B and y not in A x >= y i.e. A overlaps the upper region of B
  partial_lower, // forall x in A and x in B: forall y in B and y not in A x <= y i.e. A overlaps the lower region of B
  none // A \minus B = A
}

// match value if for every value in values: value in (min, max)
export function matchesTranslation(
  translation: Translation,
  values: Value[]
): boolean {
  return matches(values, translation.matchers).every(
    match => match === Match.subset || match === Match.exact
  );
}

// does a value match a matcher
export function matchesSingle(value: Value, matcher: Value): Match {
  return matches([value], [matcher])[0];
}

export function matches(values: Value[], matchers: Value[]): Match[] {
  return matchers.map((matcher, i) => match(values[i], matcher));
}

// interval matching
function match(value: Value | undefined, matcher: Value): Match {
  if (value === undefined) {
    return Match.none;
  }

  const A = rangeCast(value);
  const B = rangeCast(matcher);

  if (A[0] === B[0] && A[1] === B[1]) {
    return Match.exact;
  } else if (A[0] >= B[0] && A[1] <= B[1]) {
    return Match.subset;
  } else if (A[0] <= B[0] && A[1] >= B[1]) {
    return Match.superset;
  } else if (A[0] >= B[0] && A[0] <= B[1] && A[1] > B[1]) {
    return Match.partial_upper;
  } else if (A[1] >= B[0] && A[1] <= B[1] && A[0] < B[0]) {
    return Match.partial_lower;
  } else {
    return Match.none;
  }
}

function rangeCast(value: Value): Range {
  const [lower, upper] = isBoundedRange(value) ? value : [value, value];

  return [
    lower === '#' ? Number.NEGATIVE_INFINITY : lower,
    upper === '#' ? Number.POSITIVE_INFINITY : upper
  ];
}

function isBoundedRange(matcher: Value): matcher is BoundedRange {
  return Array.isArray(matcher) && matcher.length === 2;
}
