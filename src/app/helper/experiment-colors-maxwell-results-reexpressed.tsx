// A table of the frequencies that Maxwell used
// %% The Judd wavelength estimates.
// Taken from Isetfundamentals maxwellMatch.m

// Made a few adjustments the the figures for this simulation
// Color	Original	Subtracted 5	Rounded
// NM Rounded	24 - R	   44 - G     68 - B
// 650         0.42 	    0.01 	      0.06
// 595         1.16 	    0.36 	      (0.01)
// 570         0.85 	    0.88 	      0.00
// 550         0.48 	    1.25 	      (0.03)
// 535         0.13 	    1.21 	      (0.01)
// 515         (0.03)	  0.90 	      0.01
// 495         (0.06)	  0.76 	      0.08
// 490         (0.05)	  0.51 	      0.28
// 475         (0.05)	  0.34 	      0.49
// 465         (0.05)	  0.19 	      0.75
// 455         0.03 	    0.03 	      0.91
// 435         0.02 	    0.01 	      0.94
// 430         0.03 	    0.02 	      0.69
// 420         0.00      (0.03)	    0.48

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

// The 3 base colors
const round0: ColorRowData = {
  base: color20,
  slit1: addWeights(color24, 0.42),
  slit2: addWeights(color44, 0.01),
  slit3: addWeights(color68, 0.06),
};

// Changing the Blue Wavelength
const round1a: ColorRowData = {
  base: color80,
  slit1: addWeights(color24, 0),
  slit2: addWeights(color44, -0.03),
  slit3: addWeights(color68, 0.48),
};

const round1: ColorRowData = {
  base: color76,
  slit1: addWeights(color24, 0.03),
  slit2: addWeights(color44, 0.02),
  slit3: addWeights(color68, 0.69),
};

const round2: ColorRowData = {
  base: color72,
  slit1: addWeights(color24, 0.02),
  slit2: addWeights(color44, 0.01),
  slit3: addWeights(color68, 0.94),
};

const round3: ColorRowData = {
  base: color64,
  slit1: addWeights(color24, 0.03),
  slit2: addWeights(color44, 0.03),
  slit3: addWeights(color68, 0.91),
};

const round4: ColorRowData = {
  base: color60,
  slit1: addWeights(color24, -0.05),
  slit2: addWeights(color44, 0.19),
  slit3: addWeights(color68, 0.75),
};

const round5: ColorRowData = {
  base: color56,
  slit1: addWeights(color24, -0.05),
  slit2: addWeights(color44, 0.34),
  slit3: addWeights(color68, 0.49),
};

// Changing the Green Wavelength

const round6: ColorRowData = {
  base: color52,
  slit1: addWeights(color24, -0.05),
  slit2: addWeights(color44, 0.51),
  slit3: addWeights(color68, 0.28),
};

const round7: ColorRowData = {
  base: color48,
  slit1: addWeights(color24, -0.06),
  slit2: addWeights(color44, 0.76),
  slit3: addWeights(color68, 0.08),
};

const round8: ColorRowData = {
  base: color40,
  slit1: addWeights(color24, 0.13),
  slit2: addWeights(color44, 1.21),
  slit3: addWeights(color68, -0.01),
};

const round9: ColorRowData = {
  base: color36,
  slit1: addWeights(color24, 0.48),
  slit2: addWeights(color44, 1.25),
  slit3: addWeights(color68, -0.03),
};

// Changing the Red Wavelengths
const round10: ColorRowData = {
  base: color32,
  slit1: addWeights(color24, 0.85),
  slit2: addWeights(color44, 0.88),
  slit3: addWeights(color68, 0),
};

const round11: ColorRowData = {
  base: color28,
  slit1: addWeights(color24, 1.16),
  slit2: addWeights(color44, 0.36),
  slit3: addWeights(color68, -0.01),
};
const round12: ColorRowData = {
  base: color20,
  slit1: addWeights(color24, 0.42),
  slit2: addWeights(color44, 0.01),
  slit3: addWeights(color68, 0.06),
};

export default function experimentColorsMaxwellResultsReexpressed(): ColorRowData[] {
  return [
    round1a,
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
    round0,
  ];
}
