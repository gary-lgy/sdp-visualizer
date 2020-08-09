export class Attribute {
  static readonly REGEX = /a=(?<key>\w+)(:(?<value>.+))?/;

  constructor(readonly key: string, readonly value: string | null) {}

  static parse(line: string): Attribute | null {
    const matchResult = line.match(Attribute.REGEX);
    const key = matchResult?.groups?.key;
    const value = matchResult?.groups?.value;
    if (key === undefined) {
      return null;
    }
    return new Attribute(key, value ?? null);
  }
}
