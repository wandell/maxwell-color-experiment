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

const color46: ColorData = {
  name: "Bluish Green",
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
  slit1: addWeights(color24, 18.6),
  slit2: addWeights(color44, 31.4),
  slit3: addWeights(color68, 30.5),
};

// Changing the Blue Wavelength
const round1: ColorRowData = {
  base: color80,
  slit1: addWeights(color24, 18.3),
  slit2: addWeights(color44, 33.2),
  slit3: addWeights(color80, 63.7),
};

const round1a: ColorRowData = {
  base: color76,
  slit1: addWeights(color24, 17.5),
  slit2: addWeights(color44, 30.7),
  slit3: addWeights(color76, 44),
};

const round2: ColorRowData = {
  base: color72,
  slit1: addWeights(color24, 18),
  slit2: addWeights(color44, 31.2),
  slit3: addWeights(color72, 32.3),
};

const round3: ColorRowData = {
  base: color64,
  slit1: addWeights(color24, 19.7),
  slit2: addWeights(color44, 30.3),
  slit3: addWeights(color64, 33.7),
};

const round4: ColorRowData = {
  base: color60,
  slit1: addWeights(color24, 20.5),
  slit2: addWeights(color44, 23.7),
  slit3: addWeights(color60, 40.5),
};

const round5: ColorRowData = {
  base: color56,
  slit1: addWeights(color24, 21.7),
  slit2: addWeights(color44, 10.4),
  slit3: addWeights(color56, 61.7),
};

// Changing the Green Wavelength

const round6: ColorRowData = {
  base: color52,
  slit1: addWeights(color24, 22),
  slit2: addWeights(color52, 62),
  slit3: addWeights(color68, 13),
};

const round7: ColorRowData = {
  base: color48,
  slit1: addWeights(color24, 21.2),
  slit2: addWeights(color48, 41.4),
  slit3: addWeights(color68, 27),
};

const round8a: ColorRowData = {
  base: color46,
  slit1: addWeights(color24, 19.8),
  slit2: addWeights(color46, 35),
  slit3: addWeights(color68, 30.2),
};

const round8: ColorRowData = {
  base: color40,
  slit1: addWeights(color24, 15.3),
  slit2: addWeights(color40, 26),
  slit3: addWeights(color68, 31.3),
};

const round9: ColorRowData = {
  base: color36,
  slit1: addWeights(color24, 6.4),
  slit2: addWeights(color36, 25.2),
  slit3: addWeights(color68, 31.3),
};

// Changing the Red Wavelengths
const round10: ColorRowData = {
  base: color32,
  slit1: addWeights(color32, 22),
  slit2: addWeights(color44, 12.1),
  slit3: addWeights(color68, 30.6),
};

const round11: ColorRowData = {
  base: color28,
  slit1: addWeights(color28, 16.1),
  slit2: addWeights(color44, 25.6),
  slit3: addWeights(color68, 30.6),
};
const round12: ColorRowData = {
  base: color20,
  slit1: addWeights(color20, 44.3),
  slit2: addWeights(color44, 31),
  slit3: addWeights(color68, 27.7),
};

export default function experimentColorsMaxwellResults(): ColorRowData[] {
  return [
    round0,
    round1,
    round1a,
    round2,
    round3,
    round4,
    round5,
    round6,
    round7,
    // round8a,
    round8,
    round9,
    round10,
    round11,
    round12,
  ];
}
