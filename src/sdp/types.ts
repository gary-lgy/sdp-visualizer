export interface SDPSection {
  readonly lines: string[];
  readonly subSections: SDPSection[];
  readonly overview: string;
  readonly errors: string[];
}
