import { Attribute } from "./attribute";

describe("Attribute", () => {
  test("empty input => null", () => {
    const parsed = Attribute.parse("");
    expect(parsed).toBeNull();
  });

  test("imcomplete line => null", () => {
    expect(Attribute.parse("a=")).toBeNull();
    expect(
      Attribute.parse(
        "extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time"
      )
    ).toBeNull();
  });

  test("key only", () => {
    const parsed = Attribute.parse("a=sendrecv");
    expect(parsed).not.toBeNull();
    expect(parsed?.key).toBe("sendrecv");
    expect(parsed?.value).toBeNull();
  });

  test("key value (single word)", () => {
    const parsed = Attribute.parse("a=mid:0");
    expect(parsed).not.toBeNull();
    expect(parsed?.key).toBe("mid");
    expect(parsed?.value).toBe("0");
  });

  test("key value (multiple words)", () => {
    const testCases = [
      [
        "a=fmtp:111 minptime=10; useinbandfec=1",
        "fmtp",
        "111 minptime=10; useinbandfec=1",
      ],
      [
        "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
        "ssrc",
        "3570614608 cname:4TOk42mSjXCkVIa6",
      ],
      [
        "a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
        "fingerprint",
        "sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
      ],
      [
        "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 46243 typ host generation 0",
        "candidate",
        "1467250027 1 udp 2122260223 192.168.0.196 46243 typ host generation 0",
      ],
    ];
    for (let tc of testCases) {
      const parsed = Attribute.parse(tc[0]);
      expect(parsed).not.toBeNull();
      expect(parsed?.key).toStrictEqual(tc[1]);
      expect(parsed?.value).toStrictEqual(tc[2]);
    }
  });
});
