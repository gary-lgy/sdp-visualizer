import { SessionDescriptions } from "./session_description";
import { MediaDescription } from "./media_description";

describe("SessionDescription", () => {
  test("empty input => invalid", () => {
    const parsed = new SessionDescriptions([]);
    expect(parsed.overview).toStrictEqual(
      "session audio:0 video:0 application:0 unknown:0"
    );
    expect(parsed.ownLines).toStrictEqual([]);
    expect(parsed.mediaDescriptitons).toStrictEqual([]);
    expect(parsed.subSections).toStrictEqual([]);
  });

  test("no media descriptions", () => {
    const lines = [
      "o=- 4611731400430051336 2 IN IP4 127.0.0.1",
      "s=-",
      "t=0 0",
      "a=group:BUNDLE 0 1",
      "a=msid-semantic: WMS lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS",
    ];
    const parsed = new SessionDescriptions(lines);
    expect(parsed.overview).toStrictEqual(
      "session audio:0 video:0 application:0 unknown:0"
    );
    expect(parsed.ownLines).toStrictEqual(lines);
    expect(parsed.mediaDescriptitons).toStrictEqual([]);
    expect(parsed.subSections).toStrictEqual([]);
  });

  test("one audio description", () => {
    const lines = [
      "o=- 4611731400430051336 2 IN IP4 127.0.0.1",
      "s=-",
      "t=0 0",
      "a=group:BUNDLE 0 1",
      "a=msid-semantic: WMS lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS",
      "m=audio 58779 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:51472 IN IP4 217.130.243.155",
      "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 46243 typ host generation 0",
      "a=candidate:1467250027 2 udp 2122260222 192.168.0.196 56280 typ host generation 0",
      "a=candidate:435653019 1 tcp 1845501695 192.168.0.196 0 typ host tcptype active generation 0",
      "a=candidate:435653019 2 tcp 1845501695 192.168.0.196 0 typ host tcptype active generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:1853887674 2 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:750991856 2 udp 25108222 237.30.30.30 51472 typ relay raddr 47.61.61.61 rport 54763 generation 0",
      "a=candidate:750991856 1 udp 25108223 237.30.30.30 58779 typ relay raddr 47.61.61.61 rport 54761 generation 0",
      "a=ice-ufrag:Oyef7uvBlwafI3hT",
      "a=ice-pwd:T0teqPLNQQOf+5W+ls+P2p16",
      "a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
      "a=setup:actpass",
      "a=mid:0",
      "a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level",
      "a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
      "a=sendrecv",
      "a=rtcp-mux",
      "a=rtpmap:111 opus/48000/2",
      "a=fmtp:111 minptime=10; useinbandfec=1",
      "a=rtpmap:103 ISAC/16000",
      "a=rtpmap:104 ISAC/32000",
      "a=rtpmap:9 G722/8000",
      "a=rtpmap:0 PCMU/8000",
      "a=rtpmap:8 PCMA/8000",
      "a=rtpmap:106 CN/32000",
      "a=rtpmap:105 CN/16000",
      "a=rtpmap:13 CN/8000",
      "a=rtpmap:126 telephone-event/8000",
      "a=maxptime:60",
      "a=ssrc:3570614608 cname:4TOk42mSjXCkVIa6",
      "a=ssrc:3570614608 msid:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS 35429d94-5637-4686-9ecd-7d0622261ce8",
      "a=ssrc:3570614608 mslabel:lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS",
      "a=ssrc:3570614608 label:35429d94-5637-4686-9ecd-7d0622261ce8",
    ];
    const ownLines = lines.slice(0, 5);
    const audioLines = lines.slice(5, 41);
    const audioDescription = new MediaDescription(audioLines);
    const parsed = new SessionDescriptions(lines);
    expect(parsed.overview).toStrictEqual(
      "session audio:1 video:0 application:0 unknown:0"
    );
    expect(parsed.ownLines).toStrictEqual(ownLines);
    expect(parsed.mediaDescriptitons).toStrictEqual([audioDescription]);
    expect(parsed.subSections).toStrictEqual([audioDescription]);
  });

  test("one video description", () => {
    const lines = [
      "o=- 4611731400430051336 2 IN IP4 127.0.0.1",
      "s=-",
      "t=0 0",
      "a=group:BUNDLE 0 1",
      "a=msid-semantic: WMS lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS",
      "m=video 60372 UDP/TLS/RTP/SAVPF 100 101 116 117 96",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:64891 IN IP4 217.130.243.155",
      "a=candidate:1467250027 1 udp 2122260223 192.168.0.196 56143 typ host generation 0",
      "a=candidate:1467250027 2 udp 2122260222 192.168.0.196 58874 typ host generation 0",
      "a=candidate:435653019 1 tcp 1518280447 192.168.0.196 0 typ host tcptype active generation 0",
      "a=candidate:435653019 2 tcp 1518280446 192.168.0.196 0 typ host tcptype active generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:1853887674 1 udp 1518280447 47.61.61.61 36768 typ srflx raddr 192.168.0.196 rport 36768 generation 0",
      "a=candidate:750991856 1 udp 25108223 237.30.30.30 60372 typ relay raddr 47.61.61.61 rport 54765 generation 0",
      "a=candidate:750991856 2 udp 25108222 237.30.30.30 64891 typ relay raddr 47.61.61.61 rport 54767 generation 0",
      "a=ice-ufrag:Oyef7uvBlwafI3hT",
      "a=ice-pwd:T0teqPLNQQOf+5W+ls+P2p16",
      "a=fingerprint:sha-256 49:66:12:17:0D:1C:91:AE:57:4C:C6:36:DD:D5:97:D2:7D:62:C9:9A:7F:B9:A3:F4:70:03:E7:43:91:73:23:5E",
      "a=setup:actpass",
      "a=mid:0",
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
    ];
    const ownLines = lines.slice(0, 5);
    const videoLines = lines.slice(5, 47);
    const videoDescription = new MediaDescription(videoLines);
    const parsed = new SessionDescriptions(lines);
    expect(parsed.overview).toStrictEqual(
      "session audio:0 video:1 application:0 unknown:0"
    );
    expect(parsed.ownLines).toStrictEqual(ownLines);
    expect(parsed.mediaDescriptitons).toStrictEqual([videoDescription]);
    expect(parsed.subSections).toStrictEqual([videoDescription]);
  });

  test("one dataChannel description", () => {
    const lines = [
      "o=- 4611731400430051336 2 IN IP4 127.0.0.1",
      "s=-",
      "t=0 0",
      "a=group:BUNDLE 0 1",
      "a=msid-semantic: WMS lgsCFqt9kN2fVKw5wg3NKqGdATQoltEwOdMS",
      "m=application 61570 UDP/DTLS/SCTP webrtc-datachannel",
      "c=IN IP4 217.130.243.155",
      "a=candidate:3642690786 1 udp 2122260223 217.130.243.155 61570 typ host generation 0 network-id 1 network-cost 10",
      "a=ice-ufrag:+Gfd",
      "a=ice-pwd:FqWfqBWQ8t05N+c7V/ItkXx2",
      "a=ice-options:trickle",
      "a=fingerprint:sha-256 4A:A1:0C:0A:34:20:5B:80:C7:C5:D1:6A:61:3D:86:72:04:5C:CE:49:BF:2C:5B:29:6C:B1:AF:43:3D:52:D0:DB",
      "a=setup:actpass",
      "a=mid:2",
      "a=sctp-port:5000",
      "a=max-message-size:262144",
    ];
    const ownLines = lines.slice(0, 5);
    const dataChannelLines = lines.slice(5, 16);
    const dataChannelDescription = new MediaDescription(dataChannelLines);
    const parsed = new SessionDescriptions(lines);
    expect(parsed.overview).toStrictEqual(
      "session audio:0 video:0 application:1 unknown:0"
    );
    expect(parsed.ownLines).toStrictEqual(ownLines);
    expect(parsed.mediaDescriptitons).toStrictEqual([dataChannelDescription]);
    expect(parsed.subSections).toStrictEqual([dataChannelDescription]);
  });

  test("audio + video + dataChannel", () => {
    const lines = [
      "o=- 3415271765864425224 2 IN IP4 127.0.0.1",
      "s=-",
      "t=0 0",
      "a=group:BUNDLE 0 1 2",
      "a=msid-semantic: WMS HmCysVFPxD0zOO6Ai9nCEYh2zEGDaCpuiLVB",
      "m=audio 49310 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:9 IN IP4 0.0.0.0",
      "a=candidate:3642690786 1 udp 2122260223 217.130.243.155 49310 typ host generation 0 network-id 1 network-cost 10",
      "a=ice-ufrag:+Gfd",
      "a=ice-pwd:FqWfqBWQ8t05N+c7V/ItkXx2",
      "a=ice-options:trickle",
      "a=fingerprint:sha-256 4A:A1:0C:0A:34:20:5B:80:C7:C5:D1:6A:61:3D:86:72:04:5C:CE:49:BF:2C:5B:29:6C:B1:AF:43:3D:52:D0:DB",
      "a=setup:actpass",
      "a=mid:0",
      "a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level",
      "a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
      "a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
      "a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid",
      "a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id",
      "a=extmap:6 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id",
      "a=sendrecv",
      "a=msid:HmCysVFPxD0zOO6Ai9nCEYh2zEGDaCpuiLVB 3e00d8f3-c841-49b0-9140-84d3d0eec6e8",
      "a=rtcp-mux",
      "a=rtpmap:111 opus/48000/2",
      "a=rtcp-fb:111 transport-cc",
      "a=fmtp:111 minptime=10;useinbandfec=1",
      "a=rtpmap:103 ISAC/16000",
      "a=rtpmap:104 ISAC/32000",
      "a=rtpmap:9 G722/8000",
      "a=rtpmap:0 PCMU/8000",
      "a=rtpmap:8 PCMA/8000",
      "a=rtpmap:106 CN/32000",
      "a=rtpmap:105 CN/16000",
      "a=rtpmap:13 CN/8000",
      "a=rtpmap:110 telephone-event/48000",
      "a=rtpmap:112 telephone-event/32000",
      "a=rtpmap:113 telephone-event/16000",
      "a=rtpmap:126 telephone-event/8000",
      "a=ssrc:1538210575 cname:aR14oWfBJ9CEwCvX",
      "a=ssrc:1538210575 msid:HmCysVFPxD0zOO6Ai9nCEYh2zEGDaCpuiLVB 3e00d8f3-c841-49b0-9140-84d3d0eec6e8",
      "a=ssrc:1538210575 mslabel:HmCysVFPxD0zOO6Ai9nCEYh2zEGDaCpuiLVB",
      "a=ssrc:1538210575 label:3e00d8f3-c841-49b0-9140-84d3d0eec6e8",
      "m=video 59618 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 122 127 121 125 107 108 109 124 120 123 119 114 115 116",
      "c=IN IP4 217.130.243.155",
      "a=rtcp:9 IN IP4 0.0.0.0",
      "a=candidate:3642690786 1 udp 2122260223 217.130.243.155 59618 typ host generation 0 network-id 1 network-cost 10",
      "a=ice-ufrag:+Gfd",
      "a=ice-pwd:FqWfqBWQ8t05N+c7V/ItkXx2",
      "a=ice-options:trickle",
      "a=fingerprint:sha-256 4A:A1:0C:0A:34:20:5B:80:C7:C5:D1:6A:61:3D:86:72:04:5C:CE:49:BF:2C:5B:29:6C:B1:AF:43:3D:52:D0:DB",
      "a=setup:actpass",
      "a=mid:1",
      "a=extmap:14 urn:ietf:params:rtp-hdrext:toffset",
      "a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
      "a=extmap:13 urn:3gpp:video-orientation",
      "a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01",
      "a=extmap:12 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay",
      "a=extmap:11 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type",
      "a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing",
      "a=extmap:8 http://tools.ietf.org/html/draft-ietf-avtext-framemarking-07",
      "a=extmap:9 http://www.webrtc.org/experiments/rtp-hdrext/color-space",
      "a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid",
      "a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id",
      "a=extmap:6 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id",
      "a=sendonly",
      "a=msid:- dbbeac88-5aad-40c9-97c0-88a21627f264",
      "a=rtcp-mux",
      "a=rtcp-rsize",
      "a=rtpmap:96 VP8/90000",
      "a=rtcp-fb:96 goog-remb",
      "a=rtcp-fb:96 transport-cc",
      "a=rtcp-fb:96 ccm fir",
      "a=rtcp-fb:96 nack",
      "a=rtcp-fb:96 nack pli",
      "a=rtpmap:97 rtx/90000",
      "a=fmtp:97 apt=96",
      "a=rtpmap:98 VP9/90000",
      "a=rtcp-fb:98 goog-remb",
      "a=rtcp-fb:98 transport-cc",
      "a=rtcp-fb:98 ccm fir",
      "a=rtcp-fb:98 nack",
      "a=rtcp-fb:98 nack pli",
      "a=fmtp:98 profile-id=0",
      "a=rtpmap:99 rtx/90000",
      "a=fmtp:99 apt=98",
      "a=rtpmap:100 VP9/90000",
      "a=rtcp-fb:100 goog-remb",
      "a=rtcp-fb:100 transport-cc",
      "a=rtcp-fb:100 ccm fir",
      "a=rtcp-fb:100 nack",
      "a=rtcp-fb:100 nack pli",
      "a=fmtp:100 profile-id=2",
      "a=rtpmap:101 rtx/90000",
      "a=fmtp:101 apt=100",
      "a=rtpmap:102 H264/90000",
      "a=rtcp-fb:102 goog-remb",
      "a=rtcp-fb:102 transport-cc",
      "a=rtcp-fb:102 ccm fir",
      "a=rtcp-fb:102 nack",
      "a=rtcp-fb:102 nack pli",
      "a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f",
      "a=rtpmap:122 rtx/90000",
      "a=fmtp:122 apt=102",
      "a=rtpmap:127 H264/90000",
      "a=rtcp-fb:127 goog-remb",
      "a=rtcp-fb:127 transport-cc",
      "a=rtcp-fb:127 ccm fir",
      "a=rtcp-fb:127 nack",
      "a=rtcp-fb:127 nack pli",
      "a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f",
      "a=rtpmap:121 rtx/90000",
      "a=fmtp:121 apt=127",
      "a=rtpmap:125 H264/90000",
      "a=rtcp-fb:125 goog-remb",
      "a=rtcp-fb:125 transport-cc",
      "a=rtcp-fb:125 ccm fir",
      "a=rtcp-fb:125 nack",
      "a=rtcp-fb:125 nack pli",
      "a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f",
      "a=rtpmap:107 rtx/90000",
      "a=fmtp:107 apt=125",
      "a=rtpmap:108 H264/90000",
      "a=rtcp-fb:108 goog-remb",
      "a=rtcp-fb:108 transport-cc",
      "a=rtcp-fb:108 ccm fir",
      "a=rtcp-fb:108 nack",
      "a=rtcp-fb:108 nack pli",
      "a=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f",
      "a=rtpmap:109 rtx/90000",
      "a=fmtp:109 apt=108",
      "a=rtpmap:124 H264/90000",
      "a=rtcp-fb:124 goog-remb",
      "a=rtcp-fb:124 transport-cc",
      "a=rtcp-fb:124 ccm fir",
      "a=rtcp-fb:124 nack",
      "a=rtcp-fb:124 nack pli",
      "a=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032",
      "a=rtpmap:120 rtx/90000",
      "a=fmtp:120 apt=124",
      "a=rtpmap:123 H264/90000",
      "a=rtcp-fb:123 goog-remb",
      "a=rtcp-fb:123 transport-cc",
      "a=rtcp-fb:123 ccm fir",
      "a=rtcp-fb:123 nack",
      "a=rtcp-fb:123 nack pli",
      "a=fmtp:123 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032",
      "a=rtpmap:119 rtx/90000",
      "a=fmtp:119 apt=123",
      "a=rtpmap:114 red/90000",
      "a=rtpmap:115 rtx/90000",
      "a=fmtp:115 apt=114",
      "a=rtpmap:116 ulpfec/90000",
      "a=rid:lo send",
      "a=rid:mid send",
      "a=rid:hi send",
      "a=simulcast:send lo;mid;hi",
      "m=application 61570 UDP/DTLS/SCTP webrtc-datachannel",
      "c=IN IP4 217.130.243.155",
      "a=candidate:3642690786 1 udp 2122260223 217.130.243.155 61570 typ host generation 0 network-id 1 network-cost 10",
      "a=ice-ufrag:+Gfd",
      "a=ice-pwd:FqWfqBWQ8t05N+c7V/ItkXx2",
      "a=ice-options:trickle",
      "a=fingerprint:sha-256 4A:A1:0C:0A:34:20:5B:80:C7:C5:D1:6A:61:3D:86:72:04:5C:CE:49:BF:2C:5B:29:6C:B1:AF:43:3D:52:D0:DB",
      "a=setup:actpass",
      "a=mid:2",
      "a=sctp-port:5000",
      "a=max-message-size:262144",
    ];
    const ownLines = lines.slice(0, 5);
    const mediaLines = [
      lines.slice(5, 43),
      lines.slice(43, 157),
      lines.slice(157, 168),
    ];
    const mediaDescriptions = mediaLines.map(
      (lines) => new MediaDescription(lines)
    );
    const parsed = new SessionDescriptions(lines);
    expect(parsed.overview).toStrictEqual(
      "session audio:1 video:1 application:1 unknown:0"
    );
    expect(parsed.ownLines).toStrictEqual(ownLines);
    expect(parsed.mediaDescriptitons).toStrictEqual(mediaDescriptions);
    expect(parsed.subSections).toStrictEqual(mediaDescriptions);
  });
});
