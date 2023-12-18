"use client";

import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import conversionTable from "../helper/cie-conversion-table";
import MaxwellApparatus from "../components/MaxwellApparatus";
import MaxwellApparatusNew from "../components/MaxwellApparatusNew";
import {
  nmToRGB,
  nmToRGBMixed,
  rgbToCSSStyle,
} from "../helper/color-conversion";
import MaxwellApparatusWrapper from "../components/MaxwellApparatusWrapper";

export default function Home() {
  const defaultSlitWidth = 30;
  const defaultRed = 620;
  const defaultGreen = 520;
  const defaultBlue = 445;

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

  const style = (rgb: number[]) => {
    return {
      width: "10rem", // 40 pixels
      height: "10rem", // 40 pixels
      textStroke: "1px white",
      backgroundColor: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`, // Use redValue for the red color value
    };
  };

  return <MaxwellApparatusWrapper p1={650} p2={550} p3={460} />;
}
