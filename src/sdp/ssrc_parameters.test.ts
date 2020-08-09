import { SSRCParameters } from "./ssrc_parameters";

describe("SSRCParameters", () => {
  test("empty input => invalid", () => {
    const parsed = new SSRCParameters([]);
    expect(parsed.overview).toBe("ssrc [] id:? label:?");
  });

  test("first line does not contain ssrc", () => {
    const parsed = new SSRCParameters([
      "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 56143 typ host generation 0",
    ]);
    expect(parsed.overview).toBe("ssrc [] id:? label:?");
  });

  test("first line is ssrc with cname", () => {
    const lines = ["a=ssrc:2231627014 cname:4TOk42mSjXCkVIa6"];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [2231627014] id:? label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["2231627014"]);
    expect(parsed.id).toBeNull();
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("with cname and mslabel", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 mslabel:4TOk42mSjXCkVIa6",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608] id:? label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608"]);
    expect(parsed.id).toBeNull();
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("with cname and label", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 label:35429d94-5637-4686-9ecd-7d0622261ce8",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608] id:35429d94-5637-4686-9ecd-7d0622261ce8 label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608"]);
    expect(parsed.id).toBe("35429d94-5637-4686-9ecd-7d0622261ce8");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("with cname and msid", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 msid:4TOk42mSjXCkVIa6 35429d94-5637-4686-9ecd-7d0622261ce8",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608] id:35429d94-5637-4686-9ecd-7d0622261ce8 label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608"]);
    expect(parsed.id).toBe("35429d94-5637-4686-9ecd-7d0622261ce8");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("with cname, mslabel, and label", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 label:35429d94-5637-4686-9ecd-7d0622261ce8",
      "a=ssrc:3570614608 mslabel:4TOk42mSjXCkVIa6",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608] id:35429d94-5637-4686-9ecd-7d0622261ce8 label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608"]);
    expect(parsed.id).toBe("35429d94-5637-4686-9ecd-7d0622261ce8");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("with cname, mslabel, label, and msid", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 label:35429d94-5637-4686-9ecd-7d0622261ce8",
      "a=ssrc:3570614608 mslabel:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 msid:4TOk42mSjXCkVIa6 35429d94-5637-4686-9ecd-7d0622261ce8",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608] id:35429d94-5637-4686-9ecd-7d0622261ce8 label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608"]);
    expect(parsed.id).toBe("35429d94-5637-4686-9ecd-7d0622261ce8");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("multiple ssrcs", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:2912387382 label:35429d94-5637-4686-9ecd-7d0622261ce8",
      "a=ssrc:3570614608 mslabel:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 msid:4TOk42mSjXCkVIa6 35429d94-5637-4686-9ecd-7d0622261ce8",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608 2912387382] id:35429d94-5637-4686-9ecd-7d0622261ce8 label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608", "2912387382"]);
    expect(parsed.id).toBe("35429d94-5637-4686-9ecd-7d0622261ce8");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("conflicting id", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 label:daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=ssrc:3570614608 mslabel:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 msid:4TOk42mSjXCkVIa6 35429d94-5637-4686-9ecd-7d0622261ce8",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608] id:daed9400-d0dd-4db3-b949-422499e96e2d label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608"]);
    expect(parsed.id).toBe("daed9400-d0dd-4db3-b949-422499e96e2d");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("conflicting label", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 label:35429d94-5637-4686-9ecd-7d0622261ce8",
      "a=ssrc:3570614608 mslabel:someRandomLabel",
      "a=ssrc:3570614608 msid:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS 35429d94-5637-4686-9ecd-7d0622261ce8",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608] id:35429d94-5637-4686-9ecd-7d0622261ce8 label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608"]);
    expect(parsed.id).toBe("35429d94-5637-4686-9ecd-7d0622261ce8");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("multiple errors", () => {
    const lines = [
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:1298345897 label:35429d94-5637-4686-9ecd-7d0622261ce8",
      "a=ssrc:3570614608 mslabel:someRandomLabel",
      "a=ssrc:3570614608 msid:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS daed9400-d0dd-4db3-b949-422499e96e2d",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [3570614608 1298345897] id:35429d94-5637-4686-9ecd-7d0622261ce8 label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["3570614608", "1298345897"]);
    expect(parsed.id).toBe("35429d94-5637-4686-9ecd-7d0622261ce8");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });

  test("corrupted lines", () => {
    const testCases = [
      ["a=ssrc:3570614608 unknown:4TOk42mSjXCkVIa6"],
      ["a=ssrc: label:4TOk42mSjXCkVIa6"],
      ["a=ssrc:3570614608 cname:"],
      ["a=msid-semantic: WMS lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS"],
    ];
    for (let lines of testCases) {
      const parsed = new SSRCParameters(lines);
      expect(parsed.ownLines).toStrictEqual(lines);
      expect(parsed.subSections).toStrictEqual([]);
    }
  });

  test("two SSRCs with FID", () => {
    const lines = [
      "a=ssrc-group:FID 2231627014 632943048",
      "a=ssrc:2231627014 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:2231627014 msid:4TOk42mSjXCkVIa6 daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=ssrc:2231627014 mslabel:4TOk42mSjXCkVIa6",
      "a=ssrc:2231627014 label:daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=ssrc:632943048 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:632943048 msid:4TOk42mSjXCkVIa6 daed9400-d0dd-4db3-b949-422499e96e2d",
    ];
    const parsed = new SSRCParameters(lines);
    expect(parsed.overview).toBe(
      "ssrc [2231627014 632943048] id:daed9400-d0dd-4db3-b949-422499e96e2d label:4TOk42mSjXCkVIa6"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);

    expect(parsed.ssrcs).toStrictEqual(["2231627014", "632943048"]);
    expect(parsed.id).toBe("daed9400-d0dd-4db3-b949-422499e96e2d");
    expect(parsed.label).toBe("4TOk42mSjXCkVIa6");
  });
});
