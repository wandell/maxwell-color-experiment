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
  weight: 0,
};

const color20: ColorData = {
  name: "Red",
  nm: 650,
  weight: 0,
};

const color24: ColorData = {
  name: "Scarlet",
  nm: 620,
  weight: 0,
};

const color28: ColorData = {
  name: "Orange",
  nm: 595,
  weight: 0,
};

const color32: ColorData = {
  name: "Yellow",
  nm: 570,
  weight: 0,
};

const color36: ColorData = {
  name: "Yellow-Green",
  nm: 550,
  weight: 0,
};

const color40: ColorData = {
  name: "Green",
  nm: 535,
  weight: 0,
};

const color44: ColorData = {
  name: "Green",
  nm: 515,
  weight: 0,
};
const color48: ColorData = {
  name: "Bluish Green",
  nm: 495,
  weight: 0,
};

const color52: ColorData = {
  name: "Blue-green",
  nm: 490,
  weight: 0,
};

const color56: ColorData = {
  name: "Greenish blue",
  nm: 475,
  weight: 0,
};

const color60: ColorData = {
  name: "Blue",
  nm: 465,
  weight: 0,
};

const color64: ColorData = {
  name: "Blue",
  nm: 455,
  weight: 0,
};

const color68: ColorData = {
  name: "Blue",
  nm: 445,
  weight: 0,
};

const color72: ColorData = {
  name: "Indigo",
  nm: 440,
  weight: 0,
};

const color76: ColorData = {
  name: "Indigo",
  nm: 440,
  weight: 0,
};

const color80: ColorData = {
  name: "Indigo",
  nm: 420,
  weight: 0,
};

function addWeights(color: ColorData, weight: number): ColorData {
  // Creates a new object with the same properties as `color`
  // but with `weight` set to the new value.
  return { ...color, weight: weight };
}

// These are the set up of the colors

// The 3 base colors
const round0: ColorRowData = {
  base: colorWhite,
  slit1: addWeights(color24, 18.5),
  slit2: addWeights(color44, 32.5),
  slit3: addWeights(color68, 32),
};

// Changing the Blue Wavelength
const round1: ColorRowData = {
  base: color80,
  slit1: addWeights(color24, 17.5),
  slit2: addWeights(color44, 32.5),
  slit3: addWeights(color80, 63),
};

const round2: ColorRowData = {
  base: color72,
  slit1: addWeights(color24, 18),
  slit2: addWeights(color44, 32.5),
  slit3: addWeights(color72, 35),
};

const round3: ColorRowData = {
  base: color64,
  slit1: addWeights(color24, 19),
  slit2: addWeights(color44, 30.5),
  slit3: addWeights(color64, 35),
};

const round4: ColorRowData = {
  base: color60,
  slit1: addWeights(color24, 20),
  slit2: addWeights(color44, 23),
  slit3: addWeights(color60, 39),
};

const round5: ColorRowData = {
  base: color56,
  slit1: addWeights(color24, 21),
  slit2: addWeights(color44, 14),
  slit3: addWeights(color56, 58),
};

// Changing the Green Wavelength

const round6: ColorRowData = {
  base: color52,
  slit1: addWeights(color24, 22),
  slit2: addWeights(color52, 62),
  slit3: addWeights(color68, 11),
};

const round7: ColorRowData = {
  base: color48,
  slit1: addWeights(color24, 22),
  slit2: addWeights(color48, 42),
  slit3: addWeights(color68, 29.5),
};

const round8: ColorRowData = {
  base: color40,
  slit1: addWeights(color24, 16),
  slit2: addWeights(color40, 28),
  slit3: addWeights(color68, 32.5),
};

const round9: ColorRowData = {
  base: color36,
  slit1: addWeights(color24, 6),
  slit2: addWeights(color36, 27),
  slit3: addWeights(color68, 32.5),
};

// Changing the Red Wavelengths
const round10: ColorRowData = {
  base: color32,
  slit1: addWeights(color32, 23),
  slit2: addWeights(color44, 11.5),
  slit3: addWeights(color68, 32.5),
};

const round11: ColorRowData = {
  base: color28,
  slit1: addWeights(color28, 17),
  slit2: addWeights(color44, 26),
  slit3: addWeights(color68, 32.5),
};
const round12: ColorRowData = {
  base: color20,
  slit1: addWeights(color20, 46),
  slit2: addWeights(color44, 26),
  slit3: addWeights(color68, 33),
};

export default function experimentColorsMaxwellResults(): ColorRowData[] {
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
