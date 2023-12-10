"use client";

import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import conversionTable from "./cie-conversion-table";

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
  // States of the position of slit 1, slit 2, etc.
  const [s1nm, sets1nm] = useState<number>(380);
  const nmToXYZTable = conversionTable();

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      // Handle the case when the value is an array
      // For your case, you might take the first element of the array or handle it differently
      sets1nm(value[0]);
      // console.log(value[0]);
    } else {
      // Handle the case when the value is a number
      sets1nm(value);
      // console.log(value);
    }
  };

  const nmToRGB = (value: number) => {
    const XYZValues = nmToXYZTable[value];
    const RGB = xyzToRgb(XYZValues[0], XYZValues[1], XYZValues[2]);
    console.log(RGB);
    return RGB;
  };

  // const style = (rgb: number[]) => {
  //   return `w-40 h-40 bg-[rgb(${rgb[0]},${rgb[1]},${rgb[2]})]`;
  // };
  const style = (rgb: number[]) => {
    return {
      width: "10rem", // 40 pixels
      height: "10rem", // 40 pixels
      backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`, // Use redValue for the red color value
    };
  };

  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div style={style(nmToRGB(s1nm))}></div>
        <div className="block">
          <p>{s1nm}</p>
          <p>{nmToXYZTable[s1nm]}</p>
          <p>{nmToRGB(s1nm)}</p>
        </div>

        <div className="block">
          <Slider step={5} onChange={handleSliderChange} min={380} max={780} />
        </div>
      </div>
    </main>
  );
}
