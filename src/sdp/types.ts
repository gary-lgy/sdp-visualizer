export interface SDPSection {
  readonly overview: string;
  readonly ownLines: string[];
  readonly subSections: SDPSection[];
}
