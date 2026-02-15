import LZString from "lz-string";

export function compress(text: string): string {
  return LZString.compressToEncodedURIComponent(text || "");
}

export function decompress(segment: string): string {
  try {
    return LZString.decompressFromEncodedURIComponent(segment || "") ?? "";
  } catch {
    return "";
  }
}
