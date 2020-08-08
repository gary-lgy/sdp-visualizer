import { SDPSection } from "./types";

export class CodecParameters implements SDPSection {
  private static readonly RTPMAP_REGEX = /a=rtpmap:(?<payloadType>\d+) (?<codecName>\w+)\/(?<clockrate>\d+)/;
  static readonly INVALID_RTPMAP_ERR = "first line is not rtpmap";
  static readonly EMPTY_SECTION_ERR = "section is empty";

  readonly lines: string[];
  readonly subSections: SDPSection[] = [];
  readonly error: string;
  readonly overview: string;

  readonly payloadType: string = "";
  readonly codecName: string = "";
  readonly clockrate: string = "";

  constructor(raw: string[]) {
    this.lines = raw.slice();
    if (raw.length === 0) {
      this.error = CodecParameters.EMPTY_SECTION_ERR;
      this.overview = "";
      return;
    }

    // Extract information from the first line.
    const firstLine = raw[0];
    const matchResult = firstLine.match(CodecParameters.RTPMAP_REGEX);
    if (matchResult === null) {
      this.error = CodecParameters.INVALID_RTPMAP_ERR;
      this.overview = "";
      return;
    }

    this.payloadType = matchResult.groups?.payloadType ?? "";
    this.codecName = matchResult.groups?.codecName ?? "";
    this.clockrate = matchResult.groups?.clockrate ?? "";
    this.error = "";
    this.overview = `rtpmap ${this.payloadType} ${this.codecName} ${this.clockrate}`;
  }
}
