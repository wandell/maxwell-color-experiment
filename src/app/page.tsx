"use client";

import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import conversionTable from "./helper/cie-conversion-table";
import MaxwellApparatus from "./components/MaxwellApparatus";
import { biorhyme, inter } from "./fonts";
import MatchingTable from "./components/MatchingTable";
import { ColorRowData } from "./interfaces/color-row-interface";
import { ColorData } from "./interfaces/color-interface";
import experimentColors from "./helper/experiment-colors";
import experimentColorsMaxwellResults from "./helper/experiment-colors-maxwell-results";

// Function written by ChatGPT
function xyzToRgb(x: number, y: number, z: number): [number, number, number] {
  // From Wikipedia:
  // The CIE XYZ values must be scaled so that the Y of D65 ("white") is 1.0 (X = 0.9505, Y = 1.0000, Z = 1.0890).
  // This is usually true but some color spaces use 100 or other values (such as in CIELAB, when using specified white points).

  // const X = x / 0.9505;
  // const Y = y / 1.0;
  // const Z = z / 1.089;

  // Without the scaling
  const X = x;
  const Y = y;
  const Z = z;

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

  const testData: ColorRowData = {
    base: {
      name: "White",
      nm: 420,
      rgbColor: [0, 0, 0],
      weight: 0,
    },
    slit1: {
      name: "Red",
      nm: 620,
      rgbColor: [255, 0, 0],
      weight: 54,
    },
    slit2: {
      name: "Green",
      nm: 520,
      rgbColor: [0, 255, 0],
      weight: 100,
    },
    slit3: {
      name: "Blue",
      nm: 450,
      rgbColor: [0, 0, 255],
      weight: 10,
    },
  };

  const getColors = () => {
    return experimentColorsMaxwellResults();
  };

  // This is just for internal calc, not used in production code
  // const myExperimentNm = [
  //   655, 620, 595, 575, 555, 535, 520, 500, 490, 475, 465, 455, 445, 440, 430,
  //   425,
  // ];

  // myExperimentNm.forEach((nm) => console.log(nmToRGB(nm)));

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center p-24 pt-16`}
    >
      <div className="max-w-xl mt-10">
        <h1 className={`${biorhyme.className} text-4xl mb-4`}>
          Maxwell's Color Experiment Revisited
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

        {/* Introducing The Apparatus */}
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

        <p className="max-w-prose leading-loose mb-4">
          We will walk through step by step into the components of the tool and
          how the tool worked before going into the actual steps of the
          experiement that Maxwell conducted.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The apparatus consisted of a box around 6x3ft with a mirror, prisms,
          and lens, with a viewing hole to allow viewers to look inside the box.
        </p>
      </div>
      <div className="max-w-5xl mt-12 mb-12">
        <Image src="/figure-1.png" alt="figure-1" width={4640} height={1696} />
      </div>

      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now imagine if you shined a full spectrum white light from the viewing
          hole at the bottom. The white light would be refected through the two
          prisms and create a pure spectrum to the left.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          We see that this setup with the prisms give us the ability to convert
          white light into a pure spectrum.
        </p>
      </div>
      <div className="max-w-6xl mt-12">
        <Image src="/figure-2a.png" alt="figure-1" width={5032} height={1524} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now imagine that we create slits on the left side to cover up most of
          the pure spectrum other than a specific part. We would only see part
          of the spectrum on the other end.
        </p>
      </div>
      <div className="max-w-6xl mt-12">
        <Image src="/figure-2b.png" alt="figure-1" width={5032} height={1532} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          The next step is where a bit of magic starts happening. Imagine that
          we <b>shine light from the other direction</b>. But we will only let
          light of a specific wavelength in. We will broadly call this "red
          light" for now.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          As red light enters the inside of the apparatus, only some of the rays
          will reach the prism. Rays that hit the inner walls of the apparatus
          will be absorbed, leaving only a tiny set of rays that hits the prism,
          and gets refracted at the correct angles to reach the viewing hole.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          In the diagram below, we see that when the viewer looks through the
          hole, they will see that half of the hole is of the color of the light
          that we let in. Notice that the viewer only sees half of the hole in
          red. We will get the the other half in a few steps, but for now, with
          this setup, they will only see half of the hole as red.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2c.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now imagine what would happen if you{" "}
          <b>replace the red light with white light</b>. Similar to when we only
          shined red light in, only a specific subset of the rays will reach the
          prisms. But now the prisms will refract the white light into a pure
          spectrum.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Further more, since the different wavelengths of light get refracted
          at different angles, from this slit position,{" "}
          <b>only the red light will reach the viewing hole.</b>
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Even though we put in white light, the{" "}
          <b>the color that the viewer sees is exactly the same</b> as when the
          red light was shone in.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2d.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          If we <b>moved the position of the slit</b> now only a different
          wavelength of light would reach the observer. The light that the
          reaches the observer corrsponds to the same color of the pure spectrum
          that was formed when we shined white light in from the viewing hole.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2e.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Finally, white light is also shined in from the top portion of the
          apparatus. The white light gets reflected by the mirror and creates a
          white color on the right side of the image that the viewer sees.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-3.png" alt="figure-1" width={5312} height={1804} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          In the final setup, Maxwell had 3 slits created that let in light at 3
          different positions. From each position, since only specific
          wavelengths reach to the observer, Maxwell was able to control an
          image to be created with 3 distinct wavelengths.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The width of each slit was also adjustable while keeping the of the
          slit constant. This meant that you could let more or less of a given
          wavelength and color.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          By changing the position of the slits and the width of the slits,{" "}
          Maxwell was able to create different colors on one half of the viewing
          hole.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-4a.png" alt="figure-1" width={5312} height={1804} />
      </div>

      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          In our diagrams going forward, we will add colors to the white light
          that comes in, so that it is easier for us to know which color the
          slit positions correspond to. (Note that the actual color of the light
          that enters is white, and the white light only gets split into the
          individual colors after the light goes through the prisms.)
        </p>
      </div>

      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-4b.png" alt="figure-1" width={5312} height={1804} />
      </div>

      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now we're set! We now have all the basic parts to the tool Maxwell
          used for his experiment.
        </p>
      </div>

      {/* The Experiment */}
      <div className="max-w-xl">
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>
          The Experiment
        </h2>

        <p className="max-w-prose leading-loose mb-4">
          For the experiment, we will choose 3 primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Scarlet (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(580)) }}> Green (520nm)</b>,
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}> Blue (445nm)</b>.
          Using these three primaries, we will try to create a color that
          matches the white on the right side of the viewing hole.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          In each round of the experiment, we will{" "}
          <b>change one of these three primaries</b> to another wavelength.{" "}
          <b>The target color remains the same</b>. Even with one of the
          wavelengths changed, we still need to create the same target color
          (white).
        </p>
        <p className="max-w-prose leading-loose mb-4">
          You can Experiment with the apparatus to get an intuition on how it
          worked.
        </p>
      </div>

      <div className="z-10 mt-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatus
          slit1Pos={s1nm}
          slit1Size={s1Size}
          slit2Pos={s2nm}
          slit2Size={s2Size}
          slit3Pos={s3nm}
          slit3Size={s3Size}
          observerColor={rgbToCSSStyle(nmToRGBMixed(s1nm, s2nm, s3nm))}
        />
        {/* <div className="flex">
          <div style={style(nmToRGB(s1nm))}></div>
          <div style={style(nmToRGB(s2nm))}></div>
          <div style={style(nmToRGB(s3nm))}></div>
          <div style={style(nmToRGBMixed(s1nm, s2nm, s3nm))}></div>
        </div> */}
        {/* <div className="flex">
          <div
            style={{
              width: "10rem", // 40 pixels
              height: "5rem", // 40 pixels
            }}
          >
            <p>
              <b>Slit 1</b>
            </p>
            <p>{s1nm}nm</p>
            <p>{s1Size} width</p>
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
            <p>{s2nm}nm</p>
            <p>{s2Size} width</p>
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
            <p>{s3nm}nm</p>
            <p>{s3Size} width</p>
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
        </div> */}
      </div>

      {/* Slit Controller */}
      <div className="z-10 mt-10 max-w-3xl w-full items-center justify-between font-mono text-sm">
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

      <div className="max-w-xl">
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>
          The Results
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          The following were Maxwell's results of running the experiment with 2
          constant colors, with one color changed every round.
        </p>
        <div className="max-w-xl mb-4">
          <MatchingTable colors={getColors()} />
        </div>
        <p className="max-w-prose leading-loose mb-4">
          Maxwell then reexpressed each of these colors in terms of the 3 base
          colors. The math is simple algebra, but described below for clarity.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          For example, for Orange, he got:
        </p>

        <div className="max-w-6xl mt-4 mb-4">
          <Image src="/math-1.png" alt="figure-1" width={4615} height={301} />
        </div>

        <p className="max-w-prose leading-loose mb-4">
          For the primaries he got:
        </p>
        <div className="max-w-6xl mt-4 mb-4">
          <Image src="/math-2.png" alt="figure-1" width={4615} height={333} />
        </div>

        <p className="max-w-prose leading-loose mb-4">
          Since they are both equal white we can make the two equations equal
          each other and do algebra.
        </p>
        <div className="max-w-6xl mt-4 mb-4">
          <Image src="/math-3.png" alt="figure-1" width={4615} height={621} />
        </div>
        <p className="max-w-prose leading-loose mb-4">
          Maxwell rewrote all of the colors in terms of the 3 primaries.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          He then charted his results onto a chart in terms of the three base
          colors he had chosen.{" "}
          <b>
            They resemble the CIE Color Matching Functions with incredible
            accuracy!
          </b>
        </p>
      </div>
      <div className="max-w-3xl mt-12 mb-12">
        <Image
          src="/maxwell-results.png"
          alt="figure-1"
          width={5180}
          height={2072}
        />
      </div>
    </main>
  );
}
