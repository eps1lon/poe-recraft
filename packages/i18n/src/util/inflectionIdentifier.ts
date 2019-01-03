const default_gender = 'N';
const default_plural = 'S';
export default function inflectionIdentifier(context: { inflection?: string }) {
  const { inflection } = context;

  let gender: string | undefined;
  let plural: string | undefined;

  if (inflection != null) {
    [gender, plural] = inflection.split('');
  }

  return [gender || default_gender, plural || default_plural].join('');
}
