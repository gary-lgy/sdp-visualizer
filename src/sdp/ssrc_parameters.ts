import { SDPSection } from "./types";

export class SSRCParameters implements SDPSection {
  static readonly SSRC_LINE_REGEX = /^a=ssrc:(?<ssrc>\d+) (?<type>\w+):(?<rest>.+)$/;
  static readonly EMPTY_SECTION_ERR = "section is empty";
  static readonly INVALID_SSRC_LINE_ERR = "contains invalid ssrc line(s)";
  static readonly MULTIPLE_ID_ERR = "contains multiple ids";
  static readonly MULTIPLE_LABEL_ERR = "contains multiple labels";

  readonly lines: string[];
  readonly subSections: SDPSection[] = [];
  readonly errors: string[] = [];

  readonly ssrcs: string[] = [];
  readonly id: string | null = null;
  readonly label: string | null = null;

  constructor(inputLines: string[]) {
    this.lines = inputLines.slice();
    if (inputLines.length === 0) {
      this.addError(SSRCParameters.EMPTY_SECTION_ERR);
      return;
    }

    for (let line of inputLines) {
      if (line.startsWith("a=ssrc-group:FID")) {
        const rest = line
          .substring("a=ssrc-group:FID".length, line.length)
          .trim();
        for (let ssrc of rest.split(/\s+/)) {
          if (!this.ssrcs.includes(ssrc)) {
            this.ssrcs.push(ssrc);
          }
        }
        continue;
      }

      const matchResult = line.match(SSRCParameters.SSRC_LINE_REGEX);
      if (matchResult === null) {
        this.addError(SSRCParameters.INVALID_SSRC_LINE_ERR);
        continue;
      }
      const ssrc = matchResult.groups?.ssrc;
      if (ssrc === undefined) {
        this.addError(SSRCParameters.INVALID_SSRC_LINE_ERR);
        continue;
      }
      if (!this.ssrcs.includes(ssrc)) {
        this.ssrcs.push(ssrc);
      }
      const type = matchResult.groups?.type;
      const rest = matchResult.groups?.rest;
      if (type === undefined || rest === undefined) {
        this.addError(SSRCParameters.INVALID_SSRC_LINE_ERR);
        continue;
      }
      switch (type) {
        case "cname":
        case "mslabel":
          if (this.label !== null && this.label !== rest) {
            this.addError(SSRCParameters.MULTIPLE_LABEL_ERR);
            break;
          }
          this.label = rest;
          break;
        case "label":
          if (this.id !== null && this.id !== rest) {
            this.addError(SSRCParameters.MULTIPLE_ID_ERR);
            break;
          }
          this.id = rest;
          break;
        case "msid":
          const restSplit = rest.split(/\s+/);
          if (restSplit.length !== 2) {
            this.addError(SSRCParameters.INVALID_SSRC_LINE_ERR);
            break;
          }
          const [label, id] = restSplit;
          let ok = true;
          if (this.label !== null && this.label !== label) {
            this.addError(SSRCParameters.MULTIPLE_LABEL_ERR);
            ok = false;
          }
          if (this.id !== null && this.id !== id) {
            this.addError(SSRCParameters.MULTIPLE_ID_ERR);
            ok = false;
          }
          if (!ok) {
            break;
          }
          this.label = label;
          this.id = id;
          break;
        default:
          this.addError(SSRCParameters.INVALID_SSRC_LINE_ERR);
          break;
      }
    }
  }

  private addError(error: string) {
    if (this.errors.includes(error)) {
      return;
    }
    this.errors.push(error);
  }

  get overview(): string {
    return (
      "ssrc " +
      `[${this.ssrcs.join(" ")}] ` +
      `id:${this.id ?? "?"} ` +
      `label:${this.label ?? "?"}`
    );
  }
}
