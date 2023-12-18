"use client";
import Slider from "rc-slider";
import { useState } from "react";
import MaxwellApparatusNew from "../components/MaxwellApparatusNew";
import { nmToRGB, nmToRGBMixed } from "../helper/color-conversion";
import conversionTable from "../helper/cie-conversion-table";

const nmToXYZTable = conversionTable();

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
    <main className="min-h-screen flex-col items-center justify-between p-24 pt-12">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusNew
          slit1Pos={s1nm}
          slit1Size={s1Size}
          slit2Pos={s2nm}
          slit2Size={s2Size}
          slit3Pos={s3nm}
          slit3Size={s3Size}
          observerColor={nmToRGBMixed(s1nm, s2nm, s3nm, s1Size, s2Size, s3Size)}
        />
        <div className="flex">
          <div style={style(nmToRGB(s1nm))}></div>
          <div style={style(nmToRGB(s2nm))}></div>
          <div style={style(nmToRGB(s3nm))}></div>
          <div
            style={style(
              nmToRGBMixed(s1nm, s2nm, s3nm, s1Size, s2Size, s3Size)
            )}
          ></div>
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
    </main>
  );
}
