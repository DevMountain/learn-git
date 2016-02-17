// http://tokuhirom.mit-license.org
(function () {
"use strict";

var global = this;

var VisualWidth;
if (typeof exports !== 'undefined') {
    VisualWidth = exports;
} else {
    global.VisualWidth = VisualWidth = {};
}
VisualWidth.truncate = truncate;
VisualWidth.width = width;

function width(string) {
    var counter=0,
        i, l, c, cp;

    for (i=0, l=string.length; i<l; i++) {
        c = string.charCodeAt(i);
        if (0xD800 <= c && c <= 0xD8FF) { // surrogate pair
            // only [\u20000-\u2A6D6\u2A6D7-\u2F7FF\u2F800-\u2FA1D\u2FA1E-\u2FFFD\u30000-\u3FFFD] is full width.
            cp = 0x10000 + ((c & 0x3FF) << 10) | (string.charCodeAt(i+1) & 0x3FF);
            if (
                (0x20000 <= cp && cp <= 0x2A6D6) || (0x2A6D7 <= cp && cp <= 0x2F7FF) || (0x2F800 <= cp && cp <= 0x2FA1D) || (0x2FA1E <= cp && cp <= 0x2FFFD) || (0x30000 <= cp && cp <= 0x3FFFD) || (0xE0100 <= cp && cp <= 0xE01EF) || (0xF0000 <= cp && cp <= 0xFFFFD) || (0x100000 <= cp && cp <= 0x10FFFD)
            ) {
                counter += 2;
            } else {
                counter += 1;
            }
            i++;
        } else {
            // normal chars
            // Note: I made ambiguous character is 'full-width'. since I'm Japanese.
            if (
                (0x3000 == c) || (0xFF01 <= c && c <= 0xFF60) || (0xFFE0 <= c && c <= 0xFFE6) || (0x1100 <= c && c <= 0x115F) || (0x2329 <= c && c <= 0x232A) || (0x2E80 <= c && c <= 0x2FFB) || (0x3001 <= c && c <= 0x303E) || (0x3041 <= c && c <= 0x33FF) || (0x3400 <= c && c <= 0x4DB5) || (0x4E00 <= c && c <= 0x9FBB) || (0xA000 <= c && c <= 0xA4C6) || (0xAC00 <= c && c <= 0xD7A3) || (0xF900 <= c && c <= 0xFAD9) || (0xFE10 <= c && c <= 0xFE19) || (0xFE30 <= c && c <= 0xFE6B) || (0x00A1 == c) || (0x00A4 == c) || (0x00A7 <= c && c <= 0x00A8) || (0x00AA == c) || (0x00AD <= c && c <= 0x00AE) || (0x00B0 <= c && c <= 0x00B4) || (0x00B6 <= c && c <= 0x00BA) || (0x00BC <= c && c <= 0x00BF) || (0x00C6 == c) || (0x00D0 == c) || (0x00D7 <= c && c <= 0x00D8) || (0x00DE <= c && c <= 0x00E1) || (0x00E6 == c) || (0x00E8 <= c && c <= 0x00EA) || (0x00EC <= c && c <= 0x00ED) || (0x00F0 == c) || (0x00F2 <= c && c <= 0x00F3) || (0x00F7 <= c && c <= 0x00FA) || (0x00FC == c) || (0x00FE == c) || (0x0101 == c) || (0x0111 == c) || (0x0113 == c) || (0x011B == c) || (0x0126 <= c && c <= 0x0127) || (0x012B == c) || (0x0131 <= c && c <= 0x0133) || (0x0138 == c) || (0x013F <= c && c <= 0x0142) || (0x0144 == c) || (0x0148 <= c && c <= 0x014B) || (0x014D == c) || (0x0152 <= c && c <= 0x0153) || (0x0166 <= c && c <= 0x0167) || (0x016B == c) || (0x01CE == c) || (0x01D0 == c) || (0x01D2 == c) || (0x01D4 == c) || (0x01D6 == c) || (0x01D8 == c) || (0x01DA == c) || (0x01DC == c) || (0x0251 == c) || (0x0261 == c) || (0x02C4 == c) || (0x02C7 == c) || (0x02C9 <= c && c <= 0x02CB) || (0x02CD == c) || (0x02D0 == c) || (0x02D8 <= c && c <= 0x02DB) || (0x02DD == c) || (0x02DF == c) || (0x0300 <= c && c <= 0x036F) || (0x0391 <= c && c <= 0x03A9) || (0x03B1 <= c && c <= 0x03C1) || (0x03C3 <= c && c <= 0x03C9) || (0x0401 == c) || (0x0410 <= c && c <= 0x044F) || (0x0451 == c) || (0x2010 == c) || (0x2013 <= c && c <= 0x2016) || (0x2018 <= c && c <= 0x2019) || (0x201C <= c && c <= 0x201D) || (0x2020 <= c && c <= 0x2022) || (0x2024 <= c && c <= 0x2027) || (0x2030 == c) || (0x2032 <= c && c <= 0x2033) || (0x2035 == c) || (0x203B == c) || (0x203E == c) || (0x2074 == c) || (0x207F == c) || (0x2081 <= c && c <= 0x2084) || (0x20AC == c) || (0x2103 == c) || (0x2105 == c) || (0x2109 == c) || (0x2113 == c) || (0x2116 == c) || (0x2121 <= c && c <= 0x2122) || (0x2126 == c) || (0x212B == c) || (0x2153 <= c && c <= 0x2154) || (0x215B <= c && c <= 0x215E) || (0x2160 <= c && c <= 0x216B) || (0x2170 <= c && c <= 0x2179) || (0x2190 <= c && c <= 0x2199) || (0x21B8 <= c && c <= 0x21B9) || (0x21D2 == c) || (0x21D4 == c) || (0x21E7 == c) || (0x2200 == c) || (0x2202 <= c && c <= 0x2203) || (0x2207 <= c && c <= 0x2208) || (0x220B == c) || (0x220F == c) || (0x2211 == c) || (0x2215 == c) || (0x221A == c) || (0x221D <= c && c <= 0x2220) || (0x2223 == c) || (0x2225 == c) || (0x2227 <= c && c <= 0x222C) || (0x222E == c) || (0x2234 <= c && c <= 0x2237) || (0x223C <= c && c <= 0x223D) || (0x2248 == c) || (0x224C == c) || (0x2252 == c) || (0x2260 <= c && c <= 0x2261) || (0x2264 <= c && c <= 0x2267) || (0x226A <= c && c <= 0x226B) || (0x226E <= c && c <= 0x226F) || (0x2282 <= c && c <= 0x2283) || (0x2286 <= c && c <= 0x2287) || (0x2295 == c) || (0x2299 == c) || (0x22A5 == c) || (0x22BF == c) || (0x2312 == c) || (0x2460 <= c && c <= 0x24E9) || (0x24EB <= c && c <= 0x254B) || (0x2550 <= c && c <= 0x2573) || (0x2580 <= c && c <= 0x258F) || (0x2592 <= c && c <= 0x2595) || (0x25A0 <= c && c <= 0x25A1) || (0x25A3 <= c && c <= 0x25A9) || (0x25B2 <= c && c <= 0x25B3) || (0x25B6 <= c && c <= 0x25B7) || (0x25BC <= c && c <= 0x25BD) || (0x25C0 <= c && c <= 0x25C1) || (0x25C6 <= c && c <= 0x25C8) || (0x25CB == c) || (0x25CE <= c && c <= 0x25D1) || (0x25E2 <= c && c <= 0x25E5) || (0x25EF == c) || (0x2605 <= c && c <= 0x2606) || (0x2609 == c) || (0x260E <= c && c <= 0x260F) || (0x2614 <= c && c <= 0x2615) || (0x261C == c) || (0x261E == c) || (0x2640 == c) || (0x2642 == c) || (0x2660 <= c && c <= 0x2661) || (0x2663 <= c && c <= 0x2665) || (0x2667 <= c && c <= 0x266A) || (0x266C <= c && c <= 0x266D) || (0x266F == c) || (0x273D == c) || (0x2776 <= c && c <= 0x277F) || (0xE000 <= c && c <= 0xF8FF) || (0xFE00 <= c && c <= 0xFE0F) || (0xFFFD == c)
            ) {
                counter += 2;
            } else {
                counter += 1;
            }
        }
    }
    return counter;
}

function truncate(string, length, suffix) {
    var ret = '',
        c, clen,
        counter=0,
        chars = string.split(''),
        i, l,
        slen = width(suffix);

    if (width(string) <= length) {
        return string;
    }

    for (i=0, l=chars.length; i<l && counter < length; i++) {
        c = chars[i];
        clen = width(c);
        if (counter + clen + slen > length) {
            return ret + suffix;
        }
        ret += c;
        counter += clen;
    }
    return ret; // maybe fatal
}

}).call(this);
