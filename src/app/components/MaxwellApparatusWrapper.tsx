"use client";

import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import conversionTable from "../helper/cie-conversion-table";
import MaxwellApparatus from "./MaxwellApparatus";
import MaxwellApparatusNew from "./MaxwellApparatusNew";
import {
  nmToRGB,
  nmToRGBMixed,
  rgbToCSSStyle,
} from "../helper/color-conversion";
import LockIcon from "./icons/LockIcon";

// Take 3 primaries to setup the tool
export default function MaxwellApparatusWrapper({
  p1,
  p2,
  p3,
  isLocked,
  setWidthValue,
}: {
  p1: number;
  p2: number;
  p3: number;
  isLocked: boolean;
  setWidthValue: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const defaultSlitWidth = 30;
  const defaultRed = p1;
  const defaultGreen = p2;
  const defaultBlue = p3;

  // States of the position of slit 1, slit 2, etc.
  const [s1nm, sets1nm] = useState<number>(defaultRed);
  const [s1Size, sets1Size] = useState<number>(defaultSlitWidth);
  const [s2nm, sets2nm] = useState<number>(defaultGreen);
  const [s2Size, sets2Size] = useState<number>(defaultSlitWidth);
  const [s3nm, sets3nm] = useState<number>(defaultBlue);
  const [s3Size, sets3Size] = useState<number>(defaultSlitWidth);

  const nmToXYZTable = conversionTable();

  const handleSlitPositionChange = (
    value: number | number[],
    sliderId: number
  ) => {
    if (Array.isArray(value)) {
      // Handle the case when the value is an array
      // For your case, you might take the first element of the array or handle it differently
      switch (sliderId) {
        case 1:
          sets1nm(value[0]);
          // if (s1nm > s2nm + 55) sets1nm(value[0]);
          // console.log(s1nm < s2nm - 55);
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
          // if (s1nm > s2nm + 55) sets1nm(value);
          console.log(s1nm < s2nm - 55);
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

  const handleSlitWidthChange = (
    value: number | number[],
    sliderId: number
  ) => {
    // Use a temporary variable to hold the new sizes.
    let newS1Size = s1Size;
    let newS2Size = s2Size;
    let newS3Size = s3Size;

    if (Array.isArray(value)) {
      // Handle the case when the value is an array
      // For your case, you might take the first element of the array or handle it differently
      switch (sliderId) {
        case 1:
          newS1Size = value[0];
          sets1Size(value[0]);
          break;
        case 2:
          newS2Size = value[0];
          sets2Size(value[0]);
          break;
        case 3:
          newS3Size = value[0];
          sets3Size(value[0]);
          break;
      }
    } else {
      // Handle the case when the value is a number
      switch (sliderId) {
        case 1:
          newS1Size = value;
          sets1Size(value);
          break;
        case 2:
          newS2Size = value;
          sets2Size(value);
          break;
        case 3:
          newS3Size = value;
          sets3Size(value);
          break;
      }
      // console.log(value);
    }
    setWidthValue([newS1Size, newS2Size, newS3Size]);
  };

  const style = (rgb: number[]) => {
    return {
      width: "10rem", // 40 pixels
      height: "10rem", // 40 pixels
      textStroke: "1px white",
      backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`, // Use redValue for the red color value
    };
  };

  return (
    <div className="max-w-6xl center xl:max-h-[470px]">
      <MaxwellApparatusNew
        slit1Pos={s1nm}
        slit1Size={s1Size}
        slit2Pos={s2nm}
        slit2Size={s2Size}
        slit3Pos={s3nm}
        slit3Size={s3Size}
        observerColor={nmToRGBMixed(s1nm, s2nm, s3nm, s1Size, s2Size, s3Size)}
      />

      {/* Slit Controller */}
      <div className="relative xl:top-[-190px] w-[530px] xl:left-[280px] xl:m-0 m-auto mt-4">
        <div className="flex flex-col gap-8 border-2 rounded-lg p-7 border-[#CDCDCD]">
          <div className="gap-16">
            {/* <b>Slit 1</b> */}
            <div className="flex gap-y-16 gap-6 align-center items-center">
              {isLocked ? <LockIcon /> : <div></div>}
              <Slider
                step={5}
                disabled={isLocked ? true : false}
                onChange={(e) => handleSlitPositionChange(e, 1)}
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
                  height: 25,
                  width: 25,
                  marginLeft: 0,
                  marginTop: -10,
                  backgroundColor: "#FFF",
                  opacity: isLocked ? 0.4 : 1,
                }}
                railStyle={{
                  background:
                    "linear-gradient(270deg, #8000FF -0.25%, #00F 9.8%, #0080FF 19.85%, #0FF 29.9%, #00FF80 39.95%, #0F0 50%, #80FF00 60.05%, #FF0 70.1%, #FF8000 80.15%, #F00 90.2%, #800000 100.25%)",
                  opacity: isLocked ? 0.2 : 1,
                }}
                activeDotStyle={{
                  boxShadow: "none",
                  backgroundColor: rgbToCSSStyle(nmToRGB(s1nm)),
                }}
              />
              <Slider
                onChange={(e) => handleSlitWidthChange(e, 1)}
                min={0}
                max={100}
                // vertical={true}
                defaultValue={defaultSlitWidth}
                trackStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                handleStyle={{
                  borderColor: rgbToCSSStyle(nmToRGB(s1nm)),
                  height: 25,
                  width: 25,
                  marginLeft: 0,
                  marginTop: -10,
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
            <div className="flex gap-6 align-center items-center">
              {isLocked ? <LockIcon /> : <div></div>}

              <Slider
                step={5}
                disabled={isLocked ? true : false}
                onChange={(e) => handleSlitPositionChange(e, 2)}
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
                  height: 25,
                  width: 25,
                  marginLeft: 0,
                  marginTop: -10,
                  opacity: isLocked ? 0.4 : 1,
                }}
                railStyle={{
                  background:
                    "linear-gradient(270deg, #8000FF -0.25%, #00F 9.8%, #0080FF 19.85%, #0FF 29.9%, #00FF80 39.95%, #0F0 50%, #80FF00 60.05%, #FF0 70.1%, #FF8000 80.15%, #F00 90.2%, #800000 100.25%)",
                  opacity: isLocked ? 0.2 : 1,
                }}
                activeDotStyle={{
                  boxShadow: "none",
                  backgroundColor: rgbToCSSStyle(nmToRGB(s2nm)),
                }}
              />
              <Slider
                onChange={(e) => handleSlitWidthChange(e, 2)}
                min={0}
                max={100}
                // vertical={true}
                defaultValue={defaultSlitWidth}
                trackStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                handleStyle={{
                  borderColor: rgbToCSSStyle(nmToRGB(s2nm)),
                  height: 25,
                  width: 25,
                  marginLeft: 0,
                  marginTop: -10,
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
            <div className="flex gap-6 align-center items-center">
              {isLocked ? <LockIcon /> : <div></div>}
              <Slider
                step={5}
                disabled={isLocked ? true : false}
                onChange={(e) => handleSlitPositionChange(e, 3)}
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
                  height: 25,
                  width: 25,
                  marginLeft: 0,
                  marginTop: -10,
                  backgroundColor: "#FFF",
                  opacity: isLocked ? 0.4 : 1,
                }}
                railStyle={{
                  background:
                    "linear-gradient(270deg, #8000FF -0.25%, #00F 9.8%, #0080FF 19.85%, #0FF 29.9%, #00FF80 39.95%, #0F0 50%, #80FF00 60.05%, #FF0 70.1%, #FF8000 80.15%, #F00 90.2%, #800000 100.25%)",
                  opacity: isLocked ? 0.2 : 1,
                }}
                activeDotStyle={{
                  boxShadow: "none",
                  backgroundColor: rgbToCSSStyle(nmToRGB(s3nm)),
                }}
              />
              <Slider
                onChange={(e) => handleSlitWidthChange(e, 3)}
                min={0}
                max={100}
                // vertical={true}
                defaultValue={defaultSlitWidth}
                trackStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                railStyle={{ backgroundColor: "#CDCDCD", height: 5 }}
                handleStyle={{
                  borderColor: rgbToCSSStyle(nmToRGB(s3nm)),
                  height: 25,
                  width: 25,
                  marginLeft: 0,
                  marginTop: -10,
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
  );
}
