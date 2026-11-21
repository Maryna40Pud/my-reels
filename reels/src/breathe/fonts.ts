import { loadFont as loadSerif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadSans } from "@remotion/google-fonts/Manrope";

export const serif = loadSerif("normal", {
  weights: ["500", "600"],
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
}).fontFamily;

export const sans = loadSans("normal", {
  weights: ["400", "500", "600"],
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
}).fontFamily;
