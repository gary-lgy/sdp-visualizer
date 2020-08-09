import { SDPSection } from "./types";

export class CodecParameters implements SDPSection {
  private static readonly RTPMAP_REGEX = /a=rtpmap:(?<payloadType>\d+) (?<codecName>\w+)\/(?<clockrate>\d+)/;
  static readonly INVALID_RTPMAP_ERR = "first line is not rtpmap";
  static readonly EMPTY_SECTION_ERR = "section is empty";

  readonly lines: string[];
  readonly subSections: SDPSection[] = [];
  readonly errors: string[] = [];

  readonly payloadType: string | null = null;
  readonly codecName: string | null = null;
  readonly clockrate: string | null = null;
  get overview(): string {
    return (
      "rtpmap " +
      `pt:${this.payloadType ?? "?"} ` +
      `codec:${this.codecName ?? "?"} ` +
      `clockrate:${this.clockrate ?? "?"}`
    );
  }

  constructor(raw: string[]) {
    this.lines = raw.slice();
    if (raw.length === 0) {
      this.errors.push(CodecParameters.EMPTY_SECTION_ERR);
      return;
    }

    // Extract information from the first line.
    const firstLine = raw[0];
    const matchResult = firstLine.match(CodecParameters.RTPMAP_REGEX);
    if (matchResult === null) {
      this.errors.push(CodecParameters.INVALID_RTPMAP_ERR);
      return;
    }

    this.payloadType = matchResult.groups?.payloadType ?? null;
    this.codecName = matchResult.groups?.codecName ?? null;
    this.clockrate = matchResult.groups?.clockrate ?? null;
  }
}
