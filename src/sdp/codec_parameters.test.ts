import { CodecParameters } from "./codec_parameters";

describe("CodecParameters", () => {
  test("empty input => invalid", () => {
    const parsed = new CodecParameters([]);
    expect(parsed.errors).toStrictEqual([CodecParameters.EMPTY_SECTION_ERR]);
    expect(parsed.overview).toStrictEqual("rtpmap pt:? codec:? clockrate:?");
    expect(parsed.lines).toStrictEqual([]);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toBeNull();
    expect(parsed.codecName).toBeNull();
    expect(parsed.clockrate).toBeNull();
  });

  test("first line is not rtpmap => invalid", () => {
    const lines = ["a=rtcp-fb:100 ccm fir"];
    const parsed = new CodecParameters(lines);
    expect(parsed.errors).toStrictEqual([CodecParameters.INVALID_RTPMAP_ERR]);
    expect(parsed.overview).toStrictEqual("rtpmap pt:? codec:? clockrate:?");
    expect(parsed.lines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toBeNull();
    expect(parsed.codecName).toBeNull();
    expect(parsed.clockrate).toBeNull();
  });

  test("one rtpmap line", () => {
    const lines = ["a=rtpmap:100 VP8/90000"];
    const parsed = new CodecParameters(lines);
    expect(parsed.errors).toStrictEqual([]);
    expect(parsed.overview).toStrictEqual(
      "rtpmap pt:100 codec:VP8 clockrate:90000"
    );
    expect(parsed.lines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toStrictEqual("100");
    expect(parsed.codecName).toStrictEqual("VP8");
    expect(parsed.clockrate).toStrictEqual("90000");
  });

  test("one rtpmap line followed a rtcp-fb line", () => {
    const lines = ["a=rtpmap:100 VP8/90000", "a=rtcp-fb:100 ccm fir"];
    const parsed = new CodecParameters(lines);
    expect(parsed.errors).toStrictEqual([]);
    expect(parsed.overview).toStrictEqual(
      "rtpmap pt:100 codec:VP8 clockrate:90000"
    );
    expect(parsed.lines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toStrictEqual("100");
    expect(parsed.codecName).toStrictEqual("VP8");
    expect(parsed.clockrate).toStrictEqual("90000");
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
    expect(parsed.errors).toStrictEqual([]);
    expect(parsed.overview).toStrictEqual(
      "rtpmap pt:100 codec:VP8 clockrate:90000"
    );
    expect(parsed.lines).toStrictEqual(lines);
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.payloadType).toStrictEqual("100");
    expect(parsed.codecName).toStrictEqual("VP8");
    expect(parsed.clockrate).toStrictEqual("90000");
  });
});
