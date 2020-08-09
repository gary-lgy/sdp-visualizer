import { MediaDescription } from "./media_description";
import { CodecParameters } from "./codec_parameters";
import { SSRCParameters } from "./ssrc_parameters";

describe("MediaDescription", () => {
  test("empty input => invalid", () => {
    const parsed = new MediaDescription([]);
    expect(parsed.ownLines).toStrictEqual([]);
    expect(parsed.overview).toStrictEqual("? mid:? dir:? ssrcs:[]");
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.mid).toBeNull();
    expect(parsed.mediaType).toBeNull();
    expect(parsed.direction).toBeNull();
    expect(parsed.codecParameters).toStrictEqual([]);
    expect(parsed.ssrcParameters).toBeNull();
  });

  test("single m= line", () => {
    const lines = [
      "m=audio 58779 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126",
    ];
    const parsed = new MediaDescription(lines);
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.overview).toStrictEqual("audio mid:? dir:? ssrcs:[]");
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.mid).toBeNull();
    expect(parsed.mediaType).toStrictEqual("audio");
    expect(parsed.direction).toBeNull();
    expect(parsed.codecParameters).toStrictEqual([]);
    expect(parsed.ssrcParameters).toBeNull();
  });

  test("no rtpmap", () => {
    const lines = [
      "m=video 60372 UDP/TLS/RTP/SAVPF 100 101 116 117 96",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:64891 IN IP4 217.130.243.155",
      "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 56143 typ host generation 0",
      "a=candidate:1467250027 2 udp 2122260222 192.168.0.196 58874 typ host generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:750991856 1 udp 25108223 237.30.30.30 60372 typ relay raddr 47.61.61.61 rport 54765 generation 0",
      "a=candidate:750991856 2 udp 25108222 237.30.30.30 64891 typ relay raddr 47.61.61.61 rport 54767 generation 0",
      "a=ice-ufrag:Oyef7uvBlwafI3hT",
      "a=ice-pwd:T0teqPLNQQOf+5W+ls+P2p16",
      "a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
      "a=setup:actpass",
      "a=mid:1",
      "a=extmap:2 urn:ietf:params:rtp-hdrext:toffset",
      "a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
      "a=extmap:4 urn:3gpp:video-orientation",
      "a=sendrecv",
      "a=rtcp-mux",
    ];
    const parsed = new MediaDescription(lines);
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.overview).toStrictEqual("video mid:1 dir:sendrecv ssrcs:[]");
    expect(parsed.subSections).toStrictEqual([]);
    expect(parsed.mid).toStrictEqual("1");
    expect(parsed.mediaType).toStrictEqual("video");
    expect(parsed.direction).toStrictEqual("sendrecv");
    expect(parsed.codecParameters).toStrictEqual([]);
    expect(parsed.ssrcParameters).toBeNull();
  });

  test("with rtpmap", () => {
    const lines = [
      "m=video 60372 UDP/TLS/RTP/SAVPF 100 101 116 117 96",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:64891 IN IP4 217.130.243.155",
      "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 56143 typ host generation 0",
      "a=candidate:1467250027 2 udp 2122260222 192.168.0.196 58874 typ host generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:750991856 1 udp 25108223 237.30.30.30 60372 typ relay raddr 47.61.61.61 rport 54765 generation 0",
      "a=candidate:750991856 2 udp 25108222 237.30.30.30 64891 typ relay raddr 47.61.61.61 rport 54767 generation 0",
      "a=ice-ufrag:Oyef7uvBlwafI3hT",
      "a=ice-pwd:T0teqPLNQQOf+5W+ls+P2p16",
      "a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
      "a=setup:actpass",
      "a=mid:2",
      "a=extmap:2 urn:ietf:params:rtp-hdrext:toffset",
      "a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
      "a=extmap:4 urn:3gpp:video-orientation",
      "a=recvonly",
      "a=rtcp-mux",
      "a=rtpmap:100 VP8/90000",
      "a=rtcp-fb:100 ccm fir",
      "a=rtcp-fb:100 nack",
      "a=rtcp-fb:100 nack pli",
      "a=rtcp-fb:100 goog-remb",
      "a=rtpmap:101 VP9/90000",
      "a=rtcp-fb:101 ccm fir",
      "a=rtcp-fb:101 nack",
      "a=rtcp-fb:101 nack pli",
      "a=rtcp-fb:101 goog-remb",
      "a=rtpmap:116 red/90000",
      "a=rtpmap:117 ulpfec/90000",
      "a=rtpmap:96 rtx/90000",
      "a=fmtp:96 apt=100",
    ];
    const parsed = new MediaDescription(lines);
    const ownLines = lines.slice(0, 19);
    const codecParameters = [
      new CodecParameters(lines.slice(19, 24)),
      new CodecParameters(lines.slice(24, 29)),
      new CodecParameters(lines.slice(29, 30)),
      new CodecParameters(lines.slice(30, 31)),
      new CodecParameters(lines.slice(31, 33)),
    ];
    expect(parsed.ownLines).toStrictEqual(ownLines);
    expect(parsed.overview).toStrictEqual("video mid:2 dir:recvonly ssrcs:[]");
    expect(parsed.subSections).toStrictEqual(codecParameters);
    expect(parsed.mid).toStrictEqual("2");
    expect(parsed.mediaType).toStrictEqual("video");
    expect(parsed.direction).toStrictEqual("recvonly");
    expect(parsed.codecParameters).toStrictEqual(codecParameters);
    expect(parsed.ssrcParameters).toBeNull();
  });

  test("with rtpmap and ssrc", () => {
    const lines = [
      "m=video 60372 UDP/TLS/RTP/SAVPF 100 101 116 117 96",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:64891 IN IP4 217.130.243.155",
      "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 56143 typ host generation 0",
      "a=candidate:1467250027 2 udp 2122260222 192.168.0.196 58874 typ host generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:750991856 1 udp 25108223 237.30.30.30 60372 typ relay raddr 47.61.61.61 rport 54765 generation 0",
      "a=candidate:750991856 2 udp 25108222 237.30.30.30 64891 typ relay raddr 47.61.61.61 rport 54767 generation 0",
      "a=ice-ufrag:Oyef7uvBlwafI3hT",
      "a=ice-pwd:T0teqPLNQQOf+5W+ls+P2p16",
      "a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
      "a=setup:actpass",
      "a=mid:3",
      "a=extmap:2 urn:ietf:params:rtp-hdrext:toffset",
      "a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
      "a=extmap:4 urn:3gpp:video-orientation",
      "a=sendonly",
      "a=rtcp-mux",
      "a=rtpmap:100 VP8/90000",
      "a=rtcp-fb:100 ccm fir",
      "a=rtcp-fb:100 nack",
      "a=rtcp-fb:100 nack pli",
      "a=rtcp-fb:100 goog-remb",
      "a=rtpmap:101 VP9/90000",
      "a=rtcp-fb:101 ccm fir",
      "a=rtcp-fb:101 nack",
      "a=rtcp-fb:101 nack pli",
      "a=rtcp-fb:101 goog-remb",
      "a=rtpmap:116 red/90000",
      "a=rtpmap:117 ulpfec/90000",
      "a=rtpmap:96 rtx/90000",
      "a=fmtp:96 apt=100",
      "a=ssrc-group:FID 2231627014 632943048",
      "a=ssrc:2231627014 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:2231627014 msid:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=ssrc:2231627014 mslabel:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS",
      "a=ssrc:2231627014 label:daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=ssrc:632943048 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:632943048 msid:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS daed9400-d0dd-4db3-b949-422499e96e2d",
    ];
    const parsed = new MediaDescription(lines);
    const ownLines = lines.slice(0, 19);
    const codecParameters = [
      new CodecParameters(lines.slice(19, 24)),
      new CodecParameters(lines.slice(24, 29)),
      new CodecParameters(lines.slice(29, 30)),
      new CodecParameters(lines.slice(30, 31)),
      new CodecParameters(lines.slice(31, 33)),
    ];
    const ssrcParameters = new SSRCParameters(lines.slice(33, lines.length));
    const subSections = [...codecParameters, ssrcParameters];
    expect(parsed.ownLines).toStrictEqual(ownLines);
    expect(parsed.overview).toStrictEqual(
      "video mid:3 dir:sendonly ssrcs:[2231627014 632943048]"
    );
    expect(parsed.subSections).toStrictEqual(subSections);
    expect(parsed.mid).toStrictEqual("3");
    expect(parsed.mediaType).toStrictEqual("video");
    expect(parsed.direction).toStrictEqual("sendonly");
    expect(parsed.codecParameters).toStrictEqual(codecParameters);
    expect(parsed.ssrcParameters).toStrictEqual(ssrcParameters);
  });

  test("simulcast", () => {
    const lines = [
      "m=video 60372 UDP/TLS/RTP/SAVPF 100 101 116 117 96",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:64891 IN IP4 217.130.243.155",
      "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 56143 typ host generation 0",
      "a=candidate:1467250027 2 udp 2122260222 192.168.0.196 58874 typ host generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:750991856 1 udp 25108223 237.30.30.30 60372 typ relay raddr 47.61.61.61 rport 54765 generation 0",
      "a=candidate:750991856 2 udp 25108222 237.30.30.30 64891 typ relay raddr 47.61.61.61 rport 54767 generation 0",
      "a=ice-ufrag:Oyef7uvBlwafI3hT",
      "a=ice-pwd:T0teqPLNQQOf+5W+ls+P2p16",
      "a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
      "a=setup:actpass",
      "a=mid:4",
      "a=extmap:2 urn:ietf:params:rtp-hdrext:toffset",
      "a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
      "a=extmap:4 urn:3gpp:video-orientation",
      "a=sendrecv",
      "a=rtcp-mux",
      "a=rtpmap:100 VP8/90000",
      "a=rtcp-fb:100 ccm fir",
      "a=rtcp-fb:100 nack",
      "a=rtcp-fb:100 nack pli",
      "a=rtcp-fb:100 goog-remb",
      "a=rtpmap:101 VP9/90000",
      "a=rtcp-fb:101 ccm fir",
      "a=rtcp-fb:101 nack",
      "a=rtcp-fb:101 nack pli",
      "a=rtcp-fb:101 goog-remb",
      "a=rtpmap:116 red/90000",
      "a=rtpmap:117 ulpfec/90000",
      "a=rtpmap:96 rtx/90000",
      "a=fmtp:96 apt=100",
      "a=ssrc-group:FID 2231627014 632943048",
      "a=ssrc:2231627014 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:2231627014 msid:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=ssrc:2231627014 mslabel:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS",
      "a=ssrc:2231627014 label:daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=ssrc:632943048 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:632943048 msid:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS daed9400-d0dd-4db3-b949-422499e96e2d",
      "a=rid:h send",
      "a=rid:m send",
      "a=rid:l send",
      "a=simulcast: send h;m;l",
    ];
    const parsed = new MediaDescription(lines);
    const ownLines = lines.slice(0, 19).concat(...lines.slice(40, 44));
    const codecParameters = [
      new CodecParameters(lines.slice(19, 24)),
      new CodecParameters(lines.slice(24, 29)),
      new CodecParameters(lines.slice(29, 30)),
      new CodecParameters(lines.slice(30, 31)),
      new CodecParameters(lines.slice(31, 33)),
    ];
    const ssrcParameters = new SSRCParameters(lines.slice(33, 40));
    const subSections = [...codecParameters, ssrcParameters];
    expect(parsed.ownLines).toStrictEqual(ownLines);
    expect(parsed.overview).toStrictEqual(
      "video mid:4 dir:sendrecv ssrcs:[2231627014 632943048] simulcast:[h send,m send,l send]"
    );
    expect(parsed.subSections).toStrictEqual(subSections);
    expect(parsed.mid).toStrictEqual("4");
    expect(parsed.mediaType).toStrictEqual("video");
    expect(parsed.direction).toStrictEqual("sendrecv");
    expect(parsed.codecParameters).toStrictEqual(codecParameters);
    expect(parsed.ssrcParameters).toStrictEqual(ssrcParameters);
    expect(parsed.hasSimulcast).toBe(true);
    expect(parsed.simulcastStreams).toStrictEqual([
      "h send",
      "m send",
      "l send",
    ]);
  });
});
