// A table of the frequencies that Maxwell used
// %% The Judd wavelength estimates.
// Taken from Isetfundamentals maxwellMatch.m

// Made a few adjustments the the figures for this simulation
// Color	Original	Subtracted 5	Rounded
// 20	    663.2   	653.2       	655
// 24	    630.2   	620.2       	620
// 28	    606.4   	596.4       	595
// 32	    583.1   	573.1       	575
// 36	    562.5   	552.5       	555
// 40	    544.9   	534.9       	535
// 44	    528.1   	518.1       	520
// 48	    508.6   	498.6       	500
// 52	    499.7   	489.7       	490
// 56	    486.4   	476.4       	475
// 60	    475.1   	465.1       	465
// 64	    465.9   	455.9       	455
// 68	    456.9   	446.9       	445
// 72	    449.4   	439.4       	440
// 76	    441.2   	431.2       	430
// 80	    434.2   	424.2       	425

import { ColorData } from "../interfaces/color-interface";
import { ColorRowData } from "../interfaces/color-row-interface";

// These are the inidivual colors

const colorWhite: ColorData = {
  name: "Base Colors",
  nm: 650,
  rgbColor: [255, 255, 255],
  weight: 0,
};

const color20: ColorData = {
  name: "Red",
  nm: 650,
  rgbColor: [194, 0, 0],
  weight: 0,
};

const color24: ColorData = {
  name: "Scarlet",
  nm: 620,
  rgbColor: [255, 0, 0],
  weight: 0,
};

const color28: ColorData = {
  name: "Orange",
  nm: 595,
  rgbColor: [255, 138, 0],
  weight: 0,
};

const color32: ColorData = {
  name: "Yellow",
  nm: 575,
  rgbColor: [255, 230, 0],
  weight: 0,
};

const color36: ColorData = {
  name: "Yellow-Green",
  nm: 555,
  rgbColor: [181, 255, 0],
  weight: 0,
};

const color40: ColorData = {
  name: "Green",
  nm: 535,
  rgbColor: [0, 255, 0],
  weight: 0,
};

const color44: ColorData = {
  name: "Green",
  nm: 520,
  rgbColor: [0, 255, 0],
  weight: 0,
};
const color48: ColorData = {
  name: "Bluish Green",
  nm: 500,
  rgbColor: [0, 240, 104],
  weight: 0,
};

const color52: ColorData = {
  name: "Blue-green",
  nm: 490,
  rgbColor: [0, 209, 164],
  weight: 0,
};

const color56: ColorData = {
  name: "Greenish blue",
  nm: 475,
  rgbColor: [0, 155, 255],
  weight: 0,
};

const color60: ColorData = {
  name: "Blue",
  nm: 465,
  rgbColor: [0, 91, 255],
  weight: 0,
};

const color64: ColorData = {
  name: "Blue",
  nm: 455,
  rgbColor: [1, 0, 255],
  weight: 0,
};

const color68: ColorData = {
  name: "Blue",
  nm: 445,
  rgbColor: [100, 0, 255],
  weight: 0,
};

const color72: ColorData = {
  name: "Indigo",
  nm: 440,
  rgbColor: [114, 0, 255],
  weight: 0,
};

const color76: ColorData = {
  name: "Indigo",
  nm: 430,
  rgbColor: [119, 0, 255],
  weight: 0,
};

const color80: ColorData = {
  name: "Indigo",
  nm: 425,
  rgbColor: [116, 0, 255],
  weight: 0,
};

// These are the set up of the colors

// The 3 base colors
const round0: ColorRowData = {
  base: colorWhite,
  slit1: color24,
  slit2: color44,
  slit3: color68,
};

// Changing the Blue Wavelength
const round1: ColorRowData = {
  base: color80,
  slit1: color24,
  slit2: color44,
  slit3: color80,
};

const round2: ColorRowData = {
  base: color72,
  slit1: color24,
  slit2: color44,
  slit3: color72,
};

const round3: ColorRowData = {
  base: color64,
  slit1: color24,
  slit2: color44,
  slit3: color64,
};

const round4: ColorRowData = {
  base: color60,
  slit1: color24,
  slit2: color44,
  slit3: color60,
};

const round5: ColorRowData = {
  base: color56,
  slit1: color24,
  slit2: color44,
  slit3: color56,
};

// Changing the Green Wavelength

const round6: ColorRowData = {
  base: color52,
  slit1: color24,
  slit2: color52,
  slit3: color68,
};

const round7: ColorRowData = {
  base: color48,
  slit1: color24,
  slit2: color48,
  slit3: color68,
};

const round8: ColorRowData = {
  base: color40,
  slit1: color24,
  slit2: color40,
  slit3: color68,
};

const round9: ColorRowData = {
  base: color36,
  slit1: color24,
  slit2: color36,
  slit3: color68,
};

// Changing the Red Wavelengths
const round10: ColorRowData = {
  base: color32,
  slit1: color32,
  slit2: color44,
  slit3: color68,
};

const round11: ColorRowData = {
  base: color28,
  slit1: color28,
  slit2: color44,
  slit3: color68,
};
const round12: ColorRowData = {
  base: color20,
  slit1: color20,
  slit2: color44,
  slit3: color68,
};

export default function experimentColors(): ColorRowData[] {
  return [
    round0,
    round1,
    round2,
    round3,
    round4,
    round5,
    round6,
    round7,
    round8,
    round9,
    round10,
    round11,
    round12,
  ];
}
