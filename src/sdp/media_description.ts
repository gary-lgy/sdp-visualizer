import { SDPSection } from "./types";
import { CodecParameters } from "./codec_parameters";
import { SSRCParameters } from "./ssrc_parameters";
import { Attribute } from "./attribute";

export class MediaDescription implements SDPSection {
  static readonly EMPTY_SECTION_ERR = "section is empty";
  static readonly CODEC_KEYS = ["rtpmap", "rtcp-fb", "maxptime", "fmtp"];
  static readonly SSRC_KEYS = ["ssrc", "ssrc-group"];

  readonly ownLines: string[] = [];

  readonly mid: string | null = null;
  readonly mediaType: string | null = null;
  readonly direction: string | null = null;
  readonly codecParameters: CodecParameters[] = [];
  readonly ssrcParameters: SSRCParameters | null = null;
  readonly hasSimulcast: boolean = false;
  readonly simulcastStreams: string[] = [];

  get overview(): string {
    let simulcast = "";
    if (this.hasSimulcast) {
      simulcast = ` simulcast:[${this.simulcastStreams.join(",")}]`;
    }
    return (
      `${this.mediaType ?? "?"} ` +
      `mid:${this.mid ?? "?"} ` +
      `dir:${this.direction ?? "?"} ` +
      `ssrcs:[${this.ssrcParameters?.ssrcs?.join(" ") ?? ""}]` +
      simulcast
    );
  }

  get subSections(): SDPSection[] {
    const ret: SDPSection[] = [];
    ret.push(...this.codecParameters);
    if (this.ssrcParameters !== null) {
      ret.push(this.ssrcParameters);
    }
    return ret;
  }

  constructor(lines: string[]) {
    if (lines.length === 0) {
      return;
    }

    // TODO: change constructors to take in Attribute instead of line
    const ssrcLines: string[] = [];
    const codecLines: [string, Attribute][] = [];
    for (let line of lines) {
      if (line.startsWith("m=")) {
        const indexOfSpace = line.indexOf(" ");
        this.mediaType = line.substring(2, indexOfSpace);
      }
      if (!line.startsWith("a=")) {
        this.ownLines.push(line);
        continue;
      }
      const attribute = Attribute.parse(line);
      if (attribute === null) {
        continue;
      }
      switch (attribute.key) {
        case "inactive":
        case "sendonly":
        case "recvonly":
        case "sendrecv":
          this.direction = attribute.key;
          break;
        case "simulcast":
          this.hasSimulcast = true;
          break;
        case "rid":
          this.hasSimulcast = true;
          if (attribute.value !== null) {
            this.simulcastStreams.push(attribute.value);
          }
          break;
        case "mid":
          if (attribute.value !== null) {
            this.mid = attribute.value;
          }
          break;
      }
      if (MediaDescription.CODEC_KEYS.includes(attribute.key)) {
        codecLines.push([line, attribute]);
        continue;
      }
      if (MediaDescription.SSRC_KEYS.includes(attribute.key)) {
        ssrcLines.push(line);
        continue;
      }
      this.ownLines.push(line);
    }

    if (ssrcLines.length > 0) {
      this.ssrcParameters = new SSRCParameters(ssrcLines);
    }
    this.parseCodecParameters(codecLines);
  }

  private parseCodecParameters(codecLines: [string, Attribute][]) {
    let currentCodec: string[] = [];
    for (let [line, attribute] of codecLines) {
      if (attribute.key === "rtpmap") {
        if (currentCodec.length !== 0) {
          this.codecParameters.push(new CodecParameters(currentCodec));
        }
        currentCodec = [line];
      } else {
        currentCodec.push(line);
      }
    }
    if (currentCodec.length !== 0) {
      this.codecParameters.push(new CodecParameters(currentCodec));
    }
  }
}
