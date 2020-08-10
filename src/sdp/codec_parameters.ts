import { SDPSection } from "./types";

export class CodecParameters implements SDPSection {
  private static readonly RTPMAP_REGEX = /^a=rtpmap:(?<payloadType>\d+) (?<codec>.+)$/;

  readonly ownLines: string[];
  readonly subSections: SDPSection[] = [];

  readonly payloadType: string | null = null;
  readonly codec: string | null = null;

  get overview(): string {
    return (
      "rtpmap " +
      `pt:${this.payloadType ?? "?"} ` +
      `codec:${this.codec ?? "?"}`
    );
  }

  constructor(raw: string[]) {
    this.ownLines = raw.slice();
    if (raw.length === 0) {
      return;
    }

    // Extract information from the first line.
    const firstLine = raw[0];
    const matchResult = firstLine.match(CodecParameters.RTPMAP_REGEX);
    if (matchResult === null) {
      return;
    }

    this.payloadType = matchResult.groups?.payloadType ?? null;
    this.codec = matchResult.groups?.codec ?? null;
  }
}
