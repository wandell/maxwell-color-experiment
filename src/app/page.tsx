"use client";

import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import conversionTable from "./cie-conversion-table";
import MaxwellApparatus from "./components/MaxwellApparatus";
import { biorhyme, inter } from "./fonts";

// Function written by ChatGPT
function xyzToRgb(x: number, y: number, z: number): [number, number, number] {
  // Scale the input XYZ values
  const X = x / 0.9505;
  const Y = y / 1.0;
  const Z = z / 1.089;

  // Apply the linear transformation
  let R = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
  let G = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
  let B = X * 0.0557 + Y * -0.204 + Z * 1.057;

  // Apply gamma correction
  R = R <= 0.0031308 ? 12.92 * R : 1.055 * Math.pow(R, 1 / 2.4) - 0.055;
  G = G <= 0.0031308 ? 12.92 * G : 1.055 * Math.pow(G, 1 / 2.4) - 0.055;
  B = B <= 0.0031308 ? 12.92 * B : 1.055 * Math.pow(B, 1 / 2.4) - 0.055;

  // Clip the values to the range [0, 1] and convert to the range [0, 255]
  const clip = (v: number) => Math.min(Math.max(v, 0), 1);
  R = Math.round(clip(R) * 255);
  G = Math.round(clip(G) * 255);
  B = Math.round(clip(B) * 255);

  return [R, G, B];
}

export default function Home() {
  const defaultSlitWidth = 30;
  const defaultRed = 630;
  const defaultGreen = 530;
  const defaultBlue = 455;

  // States of the position of slit 1, slit 2, etc.
  const [s1nm, sets1nm] = useState<number>(defaultRed);
  const [s1Size, sets1Size] = useState<number>(defaultSlitWidth);
  const [s2nm, sets2nm] = useState<number>(defaultGreen);
  const [s2Size, sets2Size] = useState<number>(defaultSlitWidth);
  const [s3nm, sets3nm] = useState<number>(defaultBlue);
  const [s3Size, sets3Size] = useState<number>(defaultSlitWidth);

  const nmToXYZTable = conversionTable();

  // Currently only takes the combination of 2 XYZ
  const combineXYZ = (XYZ1: number[], XYZ2: number[], XYZ3: number[]) => {
    const combinedX =
      (XYZ1[0] * s1Size) / 100 +
      (XYZ2[0] * s2Size) / 100 +
      (XYZ3[0] * s3Size) / 100;
    const combinedY =
      (XYZ1[1] * s1Size) / 100 +
      (XYZ2[1] * s2Size) / 100 +
      (XYZ3[1] * s3Size) / 100;
    const combinedZ =
      (XYZ1[2] * s1Size) / 100 +
      (XYZ2[2] * s2Size) / 100 +
      (XYZ3[2] * s3Size) / 100;

    return [combinedX, combinedY, combinedZ];
  };

  const handleSliderChange = (value: number | number[], sliderId: number) => {
    if (Array.isArray(value)) {
      // Handle the case when the value is an array
      // For your case, you might take the first element of the array or handle it differently
      switch (sliderId) {
        case 1:
          sets1nm(value[0]);
          break;
        case 2:
          sets2nm(value[0]);
          break;
        case 3:
          sets3nm(value[0]);
          break;
      }
    } else {
      // Handle the case when the value is a number
      switch (sliderId) {
        case 1:
          sets1nm(value);
          break;
        case 2:
          sets2nm(value);
          break;
        case 3:
          sets3nm(value);
          break;
      }
      // console.log(value);
    }
  };

  const handleSliderChangeAmount = (
    value: number | number[],
    sliderId: number
  ) => {
    if (Array.isArray(value)) {
      // Handle the case when the value is an array
      // For your case, you might take the first element of the array or handle it differently
      switch (sliderId) {
        case 1:
          sets1Size(value[0]);
          break;
        case 2:
          sets2Size(value[0]);
          break;
        case 3:
          sets3Size(value[0]);
          break;
      }
    } else {
      // Handle the case when the value is a number
      switch (sliderId) {
        case 1:
          sets1Size(value);
          break;
        case 2:
          sets2Size(value);
          break;
        case 3:
          sets3Size(value);
          break;
      }
      // console.log(value);
    }
  };

  const nmToRGB = (value: number) => {
    const XYZValues = nmToXYZTable[value];
    const RGB = xyzToRgb(XYZValues[0], XYZValues[1], XYZValues[2]);
    // console.log(RGB);
    return RGB;
  };

  const nmToRGBMixed = (value1: number, value2: number, value3: number) => {
    const XYZValues1 = nmToXYZTable[value1];
    const XYZValues2 = nmToXYZTable[value2];
    const XYZValues3 = nmToXYZTable[value3];

    const combinedXYZ = combineXYZ(XYZValues1, XYZValues2, XYZValues3);

    const RGB = xyzToRgb(combinedXYZ[0], combinedXYZ[1], combinedXYZ[2]);
    // console.log(RGB);
    return RGB;
  };

  const style = (rgb: number[]) => {
    return {
      width: "10rem", // 40 pixels
      height: "10rem", // 40 pixels
      textStroke: "1px white",
      backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`, // Use redValue for the red color value
    };
  };

  const rgbToCSSStyle = (rgb: number[]) => {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`; // Use redValue for the red color value
  };

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24 pt-16`}
    >
      <div className="max-w-6xl">
        <h1 className={`${biorhyme.className} text-4xl mb-4`}>
          Maxwell's Color Experiments Revisited
        </h1>
        <p className="max-w-prose leading-loose mb-4">
          In the annals of scientific history, James Clerk Maxwell's
          contributions stand as monumental milestones, not just in the realm of
          electromagnetic waves, but also in the vibrant world of color theory.
          His pioneering experiments, a harmonious blend of physics and
          perception, have laid the foundational stones for our understanding of
          color and light.
        </p>
        <p
          className={`italic ${inter.className} text-s max-w-prose text-gray-400`}
        >
          Written by Koh Terai as a part of PSYCH221: Image Systems Engineering,
          Fall 2023 at Stanford University taught by Professor Brian Wandell.
        </p>

        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>
          Introducing the Apparatus
        </h2>

        <p className="max-w-prose leading-loose mb-4">
          Our first step in retracing Maxwell's path is to acquaint ourselves
          with the ingenious apparatus he conceived. This tool wasn't merely a
          scientific instrument; it was Maxwell's window into the universe of
          colors. In this section, we'll delve into the mechanics of this tool,
          dissecting it piece by piece to understand how Maxwell ingeniously
          crafted a method to decipher the formulas that govern color matching.
        </p>
      </div>
    </main>
  );
}
