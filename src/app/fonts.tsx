import { Open_Sans, BioRhyme } from "next/font/google";
import localFont from "next/font/local";

export const inter = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const biorhyme = BioRhyme({
  subsets: ["latin"],
  display: "swap",
});

// Font files can be colocated inside of `app`
export const rubikCube = localFont({
  src: "./fonts/RubikDoodleShadow-Regular.ttf",
  display: "swap",
});
