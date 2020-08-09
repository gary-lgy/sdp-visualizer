import { SDPSection } from "./types";

export class SSRCParameters implements SDPSection {
  static readonly SSRC_LINE_REGEX = /^a=ssrc:(?<ssrc>\d+) (?<type>\w+):(?<rest>.+)$/;

  readonly lines: string[];
  readonly subSections: SDPSection[] = [];

  readonly ssrcs: string[] = [];
  readonly id: string | null = null;
  readonly label: string | null = null;

  constructor(inputLines: string[]) {
    this.lines = inputLines.slice();
    if (inputLines.length === 0) {
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
        continue;
      }
      const ssrc = matchResult.groups?.ssrc;
      if (ssrc === undefined) {
        continue;
      }
      if (!this.ssrcs.includes(ssrc)) {
        this.ssrcs.push(ssrc);
      }
      const type = matchResult.groups?.type;
      const rest = matchResult.groups?.rest;
      if (type === undefined || rest === undefined) {
        continue;
      }
      switch (type) {
        case "cname":
        case "mslabel":
          if (this.label !== null && this.label !== rest) {
            break;
          }
          this.label = rest;
          break;
        case "label":
          if (this.id !== null && this.id !== rest) {
            break;
          }
          this.id = rest;
          break;
        case "msid":
          const restSplit = rest.split(/\s+/);
          if (restSplit.length !== 2) {
            break;
          }
          const [label, id] = restSplit;
          let ok = true;
          if (this.label !== null && this.label !== label) {
            ok = false;
          }
          if (this.id !== null && this.id !== id) {
            ok = false;
          }
          if (!ok) {
            break;
          }
          this.label = label;
          this.id = id;
          break;
        default:
          break;
      }
    }
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
