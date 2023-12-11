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
      className={`${inter.className} flex min-h-screen flex-col items-center justify-between p-24 pt-12`}
    >
      <div className="max-w-3xl">
        <h1 className={`${biorhyme.className} text-4xl mb-4`}>
          Maxwell's Color Experiments Revisited
        </h1>
        <p className="max-w-prose mb-4">
          Maxwell is known for his work in eletromagnetic waves, but he is also
          known for his work in discovering colors. This tutorial is an example
          of how these experiments were done.
        </p>
        <p
          className={`italic ${inter.className} text-s max-w-prose text-gray-400`}
        >
          Written by Koh Terai on December 12, 2023 as a part of PSYCH221: Image
          Systems Engineering, Fall 2023 at Stanford taught by Professor Brian
          Wandell.
        </p>

        <h2 className={`${biorhyme.className} text-2xl mt-8 mb-4`}>
          Introducing the Apparatus
        </h2>

        <p className="max-w-prose mb-4">
          First we will start by introducing the tool which Maxwell created to
          run his experiment. We will step through the tool one by one.
        </p>

        <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
          <MaxwellApparatus
            slit1Pos={s1nm}
            slit1Size={s1Size}
            slit2Pos={s2nm}
            slit2Size={s2Size}
            slit3Pos={s3nm}
            slit3Size={s3Size}
            observerColor={rgbToCSSStyle(nmToRGBMixed(s1nm, s2nm, s3nm))}
          />
          <div className="flex">
            <div style={style(nmToRGB(s1nm))}></div>
            <div style={style(nmToRGB(s2nm))}></div>
            <div style={style(nmToRGB(s3nm))}></div>
            <div style={style(nmToRGBMixed(s1nm, s2nm, s3nm))}></div>
          </div>
          <div className="flex">
            <div
              style={{
                width: "10rem", // 40 pixels
                height: "15rem", // 40 pixels
              }}
            >
              <p>
                <b>Slit 1</b>
              </p>
              <p>{s1nm}</p>
              <p>{s1Size}</p>
              <b>XYZ</b>
              <p>{nmToXYZTable[s1nm][0]}</p>
              <p>{nmToXYZTable[s1nm][1]}</p>
              <p>{nmToXYZTable[s1nm][2]}</p>
              <b>RGB</b>
              <p>{JSON.stringify(nmToRGB(s1nm))}</p>
            </div>
            <div
              style={{
                width: "10rem", // 40 pixels
                height: "5rem", // 40 pixels
              }}
            >
              <p>
                <b>Slit 2</b>
              </p>
              <p>{s2nm}</p>
              <p>{s2Size}</p>
              <b>XYZ</b>
              <p>{nmToXYZTable[s2nm][0]}</p>
              <p>{nmToXYZTable[s2nm][1]}</p>
              <p>{nmToXYZTable[s2nm][2]}</p>
              <b>RGB</b>
              <p>{JSON.stringify(nmToRGB(s2nm))}</p>
            </div>
            <div
              style={{
                width: "10rem", // 40 pixels
                height: "5rem", // 40 pixels
              }}
            >
              <p>
                <b>Slit 3</b>
              </p>
              <p>{s3nm}</p>
              <p>{s3Size}</p>
              <b>XYZ</b>
              <p>{nmToXYZTable[s3nm][0]}</p>
              <p>{nmToXYZTable[s3nm][1]}</p>
              <p>{nmToXYZTable[s3nm][2]}</p>
              <b>RGB</b>
              <p>{JSON.stringify(nmToRGB(s3nm))}</p>
            </div>
            <div
              style={{
                width: "10rem", // 40 pixels
                height: "5rem", // 40 pixels
              }}
            >
              <p>Combined</p>
            </div>
          </div>

          {/* Slit Controller */}
          <div className="flex flex-col gap-8 border-2 rounded-lg p-10 border-[#CDCDCD]">
            <div className="gap-16">
              {/* <b>Slit 1</b> */}
              <div className="flex gap-y-16 gap-6 align-center">
                <Slider
                  step={5}
                  onChange={(e) => handleSliderChange(e, 1)}
                  min={400}
                  max={700}
                  defaultValue={defaultRed}
                  reverse={true}
                  trackStyle={{
                    backgroundColor: "rgb(255 255 255 / 0%);",
                    height: 5,
                  }}
                  // railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  handleStyle={{
                    borderColor: rgbToCSSStyle(nmToRGB(s1nm)),
                    borderWidth: 4,
                    height: 35,
                    width: 35,
                    marginLeft: 0,
                    marginTop: -15,
                    backgroundColor: "#FFF",
                  }}
                  railStyle={{
                    background:
                      "linear-gradient(270deg, #8000FF -0.25%, #00F 9.8%, #0080FF 19.85%, #0FF 29.9%, #00FF80 39.95%, #0F0 50%, #80FF00 60.05%, #FF0 70.1%, #FF8000 80.15%, #F00 90.2%, #800000 100.25%)",
                  }}
                  activeDotStyle={{
                    boxShadow: "none",
                    backgroundColor: rgbToCSSStyle(nmToRGB(s1nm)),
                  }}
                />
                <Slider
                  onChange={(e) => handleSliderChangeAmount(e, 1)}
                  min={0}
                  max={100}
                  // vertical={true}
                  defaultValue={defaultSlitWidth}
                  trackStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  handleStyle={{
                    borderColor: rgbToCSSStyle(nmToRGB(s1nm)),
                    height: 35,
                    width: 35,
                    marginLeft: 0,
                    marginTop: -15,
                    backgroundColor: rgbToCSSStyle(nmToRGB(s1nm)),
                  }}
                  activeDotStyle={{
                    boxShadow: "none",
                    backgroundColor: rgbToCSSStyle(nmToRGB(s1nm)),
                  }}
                />
              </div>
            </div>
            <div className="gap-16">
              {/* <b>Slit 2</b> */}
              <div className="flex gap-6 align-center">
                <Slider
                  step={5}
                  onChange={(e) => handleSliderChange(e, 2)}
                  min={400}
                  max={700}
                  defaultValue={defaultGreen}
                  reverse={true}
                  trackStyle={{
                    backgroundColor: "rgb(255 255 255 / 0%);",
                    height: 5,
                  }}
                  // railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  handleStyle={{
                    borderColor: rgbToCSSStyle(nmToRGB(s2nm)),
                    borderWidth: 4,
                    height: 35,
                    width: 35,
                    marginLeft: 0,
                    marginTop: -15,
                    backgroundColor: "#FFF",
                  }}
                  railStyle={{
                    background:
                      "linear-gradient(270deg, #8000FF -0.25%, #00F 9.8%, #0080FF 19.85%, #0FF 29.9%, #00FF80 39.95%, #0F0 50%, #80FF00 60.05%, #FF0 70.1%, #FF8000 80.15%, #F00 90.2%, #800000 100.25%)",
                  }}
                  activeDotStyle={{
                    boxShadow: "none",
                    backgroundColor: rgbToCSSStyle(nmToRGB(s2nm)),
                  }}
                />
                <Slider
                  onChange={(e) => handleSliderChangeAmount(e, 2)}
                  min={0}
                  max={100}
                  // vertical={true}
                  defaultValue={defaultSlitWidth}
                  trackStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  handleStyle={{
                    borderColor: rgbToCSSStyle(nmToRGB(s2nm)),
                    height: 35,
                    width: 35,
                    marginLeft: 0,
                    marginTop: -15,
                    backgroundColor: rgbToCSSStyle(nmToRGB(s2nm)),
                  }}
                  activeDotStyle={{
                    boxShadow: "none",
                    backgroundColor: rgbToCSSStyle(nmToRGB(s2nm)),
                  }}
                />
              </div>
            </div>
            <div className="gap-16">
              {/* <b>Slit 3</b> */}
              <div className="flex gap-6 align-center">
                <Slider
                  step={5}
                  onChange={(e) => handleSliderChange(e, 3)}
                  min={400}
                  max={700}
                  defaultValue={defaultBlue}
                  reverse={true}
                  trackStyle={{
                    backgroundColor: "rgb(255 255 255 / 0%);",
                    height: 5,
                  }}
                  // railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  handleStyle={{
                    borderColor: rgbToCSSStyle(nmToRGB(s3nm)),
                    borderWidth: 4,
                    height: 35,
                    width: 35,
                    marginLeft: 0,
                    marginTop: -15,
                    backgroundColor: "#FFF",
                  }}
                  railStyle={{
                    background:
                      "linear-gradient(270deg, #8000FF -0.25%, #00F 9.8%, #0080FF 19.85%, #0FF 29.9%, #00FF80 39.95%, #0F0 50%, #80FF00 60.05%, #FF0 70.1%, #FF8000 80.15%, #F00 90.2%, #800000 100.25%)",
                  }}
                  activeDotStyle={{
                    boxShadow: "none",
                    backgroundColor: rgbToCSSStyle(nmToRGB(s3nm)),
                  }}
                />
                <Slider
                  onChange={(e) => handleSliderChangeAmount(e, 3)}
                  min={0}
                  max={100}
                  // vertical={true}
                  defaultValue={defaultSlitWidth}
                  trackStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                  handleStyle={{
                    borderColor: rgbToCSSStyle(nmToRGB(s3nm)),
                    height: 35,
                    width: 35,
                    marginLeft: 0,
                    marginTop: -15,
                    backgroundColor: rgbToCSSStyle(nmToRGB(s3nm)),
                  }}
                  activeDotStyle={{
                    boxShadow: "none",
                    backgroundColor: rgbToCSSStyle(nmToRGB(s3nm)),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
