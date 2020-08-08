export interface SDPSection {
  readonly lines: string[];
  readonly subSections: SDPSection[];
  readonly overview: string;
  readonly error: string;
}
