export default class NamedGroupsRegexp {
  private regexp: RegExp;
  // emulate named groups
  private groups: string[];

  constructor(regexp: RegExp, groups: string[]) {
    this.regexp = regexp;
    this.groups = groups;
  }

  match(text: string): { [key: string]: string } | null {
    const match = text.match(this.regexp);
    if (match == null) {
      return null;
    }

    // first element is hole string followed by matches
    if (match.length - 1 !== this.groups.length) {
      throw new Error('named groups count did not match matched groups count');
    }

    return match.slice(1).reduce((named, matched, i) => {
      named[this.groups[i]] = matched;

      return named;
    }, {} as { [key: string]: string });
  }
}
