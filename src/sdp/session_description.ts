import { MediaDescription } from "./media_description";
import { SDPSection } from "./types";

export class SessionDescription implements SDPSection {
  readonly ownLines: string[] = [];
  readonly mediaDescriptitons: MediaDescription[] = [];
  get subSections(): SDPSection[] {
    return this.mediaDescriptitons;
  }
  get overview(): string {
    let audioCount = 0;
    let videoCount = 0;
    let applicationCount = 0;
    let unknownCount = 0;
    for (let md of this.mediaDescriptitons) {
      switch (md.mediaType) {
        case "audio":
          audioCount++;
          break;
        case "video":
          videoCount++;
          break;
        case "application":
          applicationCount++;
          break;
        default:
          unknownCount++;
      }
    }
    return (
      "session " +
      `audio:${audioCount} ` +
      `video:${videoCount} ` +
      `application:${applicationCount} ` +
      `unknown:${unknownCount}`
    );
  }

  constructor(lines: string[]) {
    if (lines.length === 0) {
      return;
    }

    const startOfMediaDescriptions: number[] = [];
    lines.forEach((line, index) => {
      if (line.startsWith("m=")) {
        startOfMediaDescriptions.push(index);
      }
    });

    if (startOfMediaDescriptions.length === 0) {
      // No m= lines, no media descriptions
      this.ownLines = lines.slice();
      return;
    }

    this.ownLines = lines.slice(0, startOfMediaDescriptions[0]);

    for (let i = 0; i < startOfMediaDescriptions.length; i++) {
      const startIndex = startOfMediaDescriptions[i];
      const endIndex =
        i + 1 >= startOfMediaDescriptions.length
          ? lines.length
          : startOfMediaDescriptions[i + 1];
      this.mediaDescriptitons.push(
        new MediaDescription(lines.slice(startIndex, endIndex))
      );
    }
  }
}
