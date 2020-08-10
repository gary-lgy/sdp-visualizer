import { CodecParameters } from "./CodecParameters";

describe("CodecParameters", () => {
  test("empty input => invalid", () => {
    const parsed = new CodecParameters([]);
    expect(parsed.overview).toStrictEqual("rtpmap pt:? codec:?");
    expect(parsed.ownLines).toStrictEqual([]);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toBeNull();
    expect(parsed.codec).toBeNull();
  });

  test("first line is not rtpmap => invalid", () => {
    const lines = ["a=rtcp-fb:100 ccm fir"];
    const parsed = new CodecParameters(lines);
    expect(parsed.overview).toStrictEqual("rtpmap pt:? codec:?");
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toBeNull();
    expect(parsed.codec).toBeNull();
  });

  test("one rtpmap line", () => {
    const lines = ["a=rtpmap:100 VP8/90000"];
    const parsed = new CodecParameters(lines);
    expect(parsed.overview).toStrictEqual("rtpmap pt:100 codec:VP8/90000");
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toStrictEqual("100");
    expect(parsed.codec).toStrictEqual("VP8/90000");
  });

  test("one rtpmap line followed a rtcp-fb line", () => {
    const lines = ["a=rtpmap:100 VP8/90000", "a=rtcp-fb:100 ccm fir"];
    const parsed = new CodecParameters(lines);
    expect(parsed.overview).toStrictEqual("rtpmap pt:100 codec:VP8/90000");
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toStrictEqual("100");
    expect(parsed.codec).toStrictEqual("VP8/90000");
  });

  test("one rtpmap line followed multiple other lines", () => {
    const lines = [
      "a=rtpmap:100 VP8/90000",
      "a=rtcp-fb:100 ccm fir",
      "a=rtcp-fb:100 nack",
      "a=rtcp-fb:100 nack pli",
      "a=rtcp-fb:100 goog-remb",
    ];
    const parsed = new CodecParameters(lines);
    expect(parsed.overview).toStrictEqual("rtpmap pt:100 codec:VP8/90000");
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toStrictEqual("100");
    expect(parsed.codec).toStrictEqual("VP8/90000");
  });

  test("disallow partial match", () => {
    const lines = ["123a=rtpmap:100 VP8/90000"];
    const parsed = new CodecParameters(lines);
    expect(parsed.overview).toStrictEqual("rtpmap pt:? codec:?");
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toBeNull();
    expect(parsed.codec).toBeNull();
  });

  test("codec name with dash(-)", () => {
    const lines = ["a=rtpmap:110 telephone-event/48000"];
    const parsed = new CodecParameters(lines);
    expect(parsed.overview).toStrictEqual(
      "rtpmap pt:110 codec:telephone-event/48000"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toStrictEqual("110");
    expect(parsed.codec).toStrictEqual("telephone-event/48000");
  });
});
