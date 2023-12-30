/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import conversionTable from "./helper/cie-conversion-table";
import MaxwellApparatus from "./components/MaxwellApparatus";
import { biorhyme, inter, rubikCube } from "./fonts";
import MatchingTable from "./components/MatchingTable";
import { ColorRowData } from "./interfaces/color-row-interface";
import { ColorData } from "./interfaces/color-interface";
import experimentColorsMaxwellResults from "./helper/experiment-colors-maxwell-results";
import MaxwellApparatusWrapper from "./components/MaxwellApparatusWrapper";
import { nmToRGB, nmToRGBMixed } from "./helper/color-conversion";
import experimentColorsMaxwellResultsReexpressed from "./helper/experiment-colors-maxwell-results-reexpressed";
import ColorEquation from "./components/ColorEquation";

export default function Home() {
  // To store the values from the experiemnts that the user does
  const [ex0Value, setEx0Value] = useState<number[]>([30, 30, 30]);
  const [ex1Value, setEx1Value] = useState<number[]>([30, 30, 30]);
  const [ex2Value, setEx2Value] = useState<number[]>([30, 30, 30]);
  const [ex3Value, setEx3Value] = useState<number[]>([30, 30, 30]);

  const defaultSlitWidth = 30;
  const defaultRed = 620;
  const defaultGreen = 515;
  const defaultBlue = 445;

  const nmToXYZTable = conversionTable();

  const rgbToCSSStyle = (rgb: number[]) => {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`; // Use redValue for the red color value
  };

  const getColors = () => {
    return experimentColorsMaxwellResults();
  };

  const getReExpressedColors = () => {
    return experimentColorsMaxwellResultsReexpressed();
  };

  // This is just for internal calc, not used in production code
  // const myExperimentNm = [
  //   650, 620, 595, 570, 550, 535, 515, 495, 490, 475, 465, 455, 445, 435, 430,
  //   420,
  // ];

  // myExperimentNm.forEach((nm) => console.log(nmToRGB(nm)));

  return (
    <main
      className={`${inter.className} flex min-h-screen flex-col items-center p-4 xl:p-24 pt-8 xl:pt-16`}
    >
      <div className="max-w-xl mt-8">
        <h1 className={`${rubikCube.className} text-5xl mb-4`}>
          Exploring Trichromacy through Maxwell's Color Experiment
        </h1>
        <p
          className={`${inter.className} text-s mt-8 max-w-prose text-gray-600`}
        >
          by Koh Terai
        </p>
        <p className={` ${inter.className} text-sm max-w-prose text-gray-400`}>
          with the guidance of{" "}
          <a href="https://profiles.stanford.edu/brian-wandell" target="_blank">
            Professor Brian Wandell
          </a>{" "}
          for{" "}
          <a
            href="https://vista.su.domains/psych221wiki/index.php?title=Main_Page"
            target="_blank"
          >
            Psych 221: Image Systems Engineering
          </a>{" "}
          at Stanford University
        </p>
        <hr className="m-4 solid mt-12" />
        <p className="max-w-prose leading-loose">
          <b>Note:</b> This is still a draft version.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The content is still being refined before opening it to the public.{" "}
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <i>
            <b>Last Updated:</b> 06:50 Saturday, December 30, 2023 (PST)
          </i>
        </p>
        <hr className="m-4 solid mb-12" />
        <p className="max-w-prose leading-loose mb-4">
          We can create most of the colors we see daily using{" "}
          <b>just three colors</b>. For example, you may have heard of R, G, B —
          Red, Green, Blue — to express many colors. This understanding is
          fundamental to how we display color on monitors and how we print
          color.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          But why <em>three colors</em>? Why not two or four or five? And how
          did humans discover that our eyes can "see" different colors by
          combining just three colors?
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Today, this phenomenon is explained through the{" "}
          <a href="https://en.wikipedia.org/wiki/Trichromacy" target="_blank">
            trichromatic theory
          </a>
          , also known as the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Young%E2%80%93Helmholtz_theory"
            target="_blank"
          >
            Young-Helmholtz theory
          </a>
          , attributed to Thomas Young and Hermann von Helmholtz in the 19th
          century.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Less known to the development of trichromacy is another scientist —
          <a
            href="https://en.wikipedia.org/wiki/James_Clerk_Maxwell"
            target="_blank"
          >
            James Clerk Maxwell's
          </a>{" "}
          contribution to the development of the theory.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          In this piece, we explore the early experiments that led to the
          development of trichromacy through the less-celebrated,
          less-attributed James Clerk Maxwell's ingenious experiment to discover
          and prove the trichromatic theory.
        </p>
        {/* Introducing The Apparatus */}
        <h2 className={`${rubikCube.className} text-4xl mt-16 mb-4`}>
          Introducing the Apparatus
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          Our first step in retracing Maxwell's path is familiarize ourselves
          with the tool he created to conduct his experiment.
        </p>
        <p className="max-w-prose leading-loose mb-2">
          The tool consisted of a box around 6x3ft with a mirror, prisms, and
          lens, with a viewing hole to allow viewers to look inside the box.
        </p>
      </div>
      <div className="max-w-5xl mt-8 mb-2">
        <Image src="/figure-1.png" alt="figure-1" width={4640} height={1696} />
      </div>
      <div className="max-w-xl text-center">
        <b>Note:</b> <em>The figure not to scale</em>
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mt-8 mb-4">
          As a thought experiment, imagine shining a full spectrum of white
          light from the viewing hole at the bottom. The white light would be
          dispersed through the two prisms, creating a pure spectrum to the
          left, revealing all the wavelengths of visible light.
        </p>
      </div>
      <div className="max-w-6xl mt-12">
        <Image src="/figure-2a.png" alt="figure-1" width={5032} height={1524} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now imagine that we create slits on the left side to cover up most of
          the pure spectrum other than a specific section. We would only see a
          particular spectrum region on the other end.
        </p>
      </div>
      <div className="max-w-6xl mt-12">
        <Image src="/figure-2b.png" alt="figure-1" width={5032} height={1532} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Imagine that we <b>shine light from the other direction</b>. But we
          will only let a monochromatic light of a specific wavelength, say
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>
            {" "}
            620 nm (red light)
          </b>
          .
        </p>
        <p className="max-w-prose leading-loose mb-4">
          As the monochromatic red light enters the inside of the apparatus,
          only some of the rays will reach the prism. Rays that hit the inner
          walls of the device will be absorbed, leaving only a tiny set of rays
          that reach the prism and disperse at the correct angles to get to the
          viewing hole.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Furthermore, by the time the rays reach the prism, we can assume that
          they are collimated — parallel to each other — as they travel quite a
          distance through the tool.
        </p>

        <p className="max-w-prose leading-loose mb-4">
          When the viewer looks through the hole, they see half of it
          illuminated in red. This is because the prism fills only half the
          viewing hole with color.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2c.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          The next step is where the <em>magic</em> begins.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Now, imagine what would happen if you{" "}
          <b>replaced the monochromatic light with a white light</b>. Similar to
          when we only shined red light, only a specific subset of the rays will
          reach the prisms. But now, the prisms will disperse the white light
          into a pure spectrum.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Further more, since the different wavelengths of light get refracted
          at different angles, from this slit position,{" "}
          <b>
            only light with a wavelength of around ≈620 nm will reach the
            viewing hole.
          </b>
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Even though we put in white light,{" "}
          <b>the color that the viewer sees is essentially the same</b> as when
          we only shined the monochromatic{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>
            {" "}
            620 nm (red light)
          </b>{" "}
          light in.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2d.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          If we <b>moved the position of the slit</b> now, only a different set
          of wavelengths of light would reach the observer. The light that
          reaches the observer roughly corresponds to the same color of the pure
          spectrum formed when we shined white light from the viewing hole.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2e.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Finally, we also shine white light into the top section of the
          apparatus. The white light gets reflected by the mirror and creates a
          white color on the right side of the image that the viewer sees.
        </p>
      </div>
      <div className="max-w-6xl mt-4 mb-12">
        <Image src="/figure-3.png" alt="figure-1" width={5312} height={1804} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          In the final setup, Maxwell had three slits created that let in light
          at three different positions. Since only roughly specific wavelengths
          reach the observer from each position, Maxwell could{" "}
          <b>
            create different combinations of colors by combining three distinct
            wavelengths
          </b>
          .
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The width of each slit was also adjustable while keeping the center of
          the slit fixed. Widening and narrowing the slit width would allow
          Maxwell to <b>control the intensity</b> of a given color.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Although, strictly speaking, widening slit width could increase the
          range of wavelengths that reach the observer, in our experiment, we
          will assume that this setup allows us to select specific wavelengths
          for the viewer to see. Effectively each slit creates a roughly
          monochromatic light for our experiment.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          By changing the position of the slits and the width of the slits,
          Maxwell was able to create different colors on one half of the viewing
          hole.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-4a.png" alt="figure-1" width={5312} height={1804} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          From now on, in our diagrams, we will add colors to the white light
          that comes in so that it is easier for us to know which color the slit
          positions correspond to.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-4b.png" alt="figure-1" width={5312} height={1804} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now we're set! You now know all the essential parts of the tool
          Maxwell created for his experiment.
        </p>
      </div>
      {/* The Experiment */}
      <div className="max-w-xl">
        <h2 className={`${rubikCube.className} text-4xl mt-16 mb-4`}>
          The Experiment
        </h2>

        <p className="max-w-prose leading-loose mb-4">
          Each round will have three different slit positions, which are called
          primaries. For now, the slits are set at{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Scarlet (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(505)) }}> Green (515nm)</b>,
          and{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}> Blue (445nm)</b>,
          each with a <b>width of 30</b>.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          You can change both the <b>slit positions</b> and the{" "}
          <b>slit widths</b> by moving the sliders. The viewer sees a different
          color through the viewing hole by changing these parameters.
        </p>
      </div>
      <div className="z-10 mt-6 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper
          p1={620}
          p2={515}
          p3={440}
          isLocked={false}
          setWidthValue={setEx0Value}
        />
      </div>
      {/* Trial Experiment 0 */}
      <div className="max-w-xl mt-4">
        <p className="max-w-prose leading-loose mb-4">
          By adjusting the width of these three slits (hence adjusting the
          intensity of the three primaries), Maxwell found the right mix of
          light to match the target color, white.
        </p>

        <p className="max-w-prose leading-loose mb-4">
          The observer should adjust the slits until they are unable to
          distinguish the color on the left and right sides they see through the
          viewing hole.{" "}
        </p>
      </div>
      <div className="max-w-xl mt-12 mb-12">
        <Image
          src="/matchexample.png"
          alt="figure-1"
          width={3210}
          height={1320}
        />
      </div>
      <div className="max-w-xl mt-4">
        <p className="max-w-prose leading-loose mb-4">
          First, try matching the left side of the view to the right side using
          the primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(505)) }}>Green (515nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b>.{" "}
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The slit positions have been locked so the match needs to be created
          only by changing the ratio of between the three primaries.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <b>Try adjusting the slit widths</b> until you can't tell the
          difference between the left and right sides of the observer view.
        </p>
      </div>
      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper
          p1={620}
          p2={515}
          p3={445}
          isLocked={true}
          setWidthValue={setEx1Value}
        />
      </div>
      {/* Trial Experiment 2 */}
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4 mt-8">
          Now, we will <b>change one of these three primaries</b>.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          We will replace{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b>{" "}
          with{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(475)) }}>
            Greenish-Blue (475nm)
          </b>
          .
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Once again, try matching the left side of the view to the right side
          using a different set of primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(505)) }}>Green (515nm)</b>,
          and{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(475)) }}>
            Greenish-Blue (475nm)
          </b>
          .
        </p>
        <p className="max-w-prose leading-loose mb-4">
          {" "}
          Note that the target color (white) is still identical.
        </p>
      </div>
      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper
          p1={620}
          p2={515}
          p3={475}
          isLocked={true}
          setWidthValue={setEx2Value}
        />
      </div>
      {/* Trial Experiment 3 */}
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4 mt-8">
          Once again, we will <b>change one of these three primaries</b>.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          From the orignal set of{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(505)) }}>Green (515nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b>.{" "}
          will replace{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          with{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(595)) }}>Orange (595nm)</b>.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Once again, try creating a match but with the primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(595)) }}>Orange (595nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(505)) }}>Green (515nm)</b>,
          and <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b>
          .
        </p>
        <p className="max-w-prose leading-loose mb-4">
          {" "}
          Note that the target color (white) is still identical.
        </p>
      </div>
      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper
          p1={595}
          p2={515}
          p3={445}
          isLocked={true}
          setWidthValue={setEx3Value}
        />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-8 mt-8">
          Through the rounds above, you were able to{" "}
          <b>create the same target color white</b> with{" "}
          <b>different sets of three primaries</b>.
        </p>
        <div className="flex flex-col gap-2">
          <ColorEquation
            p1nm={620}
            p1weight={ex1Value[0]}
            p2nm={515}
            p2weight={ex1Value[1]}
            p3nm={445}
            p3weight={ex1Value[2]}
            targetrgb={nmToRGBMixed(
              620,
              515,
              445,
              ex1Value[0],
              ex1Value[1],
              ex1Value[2]
            )}
          />
          <ColorEquation
            p1nm={620}
            p1weight={ex2Value[0]}
            p2nm={515}
            p2weight={ex2Value[1]}
            p3nm={475}
            p3weight={ex2Value[2]}
            targetrgb={nmToRGBMixed(
              620,
              515,
              475,
              ex2Value[0],
              ex2Value[1],
              ex2Value[2]
            )}
          />
          <ColorEquation
            p1nm={595}
            p1weight={ex3Value[0]}
            p2nm={515}
            p2weight={ex3Value[1]}
            p3nm={445}
            p3weight={ex3Value[2]}
            targetrgb={nmToRGBMixed(
              595,
              515,
              445,
              ex3Value[0],
              ex3Value[1],
              ex3Value[2]
            )}
          />
        </div>

        <p className="max-w-prose leading-loose mb-4 mt-12">
          If you were able to successfully create matches, we see a two
          fascinating things emerge.
        </p>
        <ol className="list-decimal mb-4 mt-4">
          <li>
            We were able to <b>create the same target white color</b> with a
            different combination of primaries.
          </li>
          <li>
            Each set of three primaries required a slightly different amount of
            each color.
          </li>
        </ol>
        <p className="max-w-prose leading-loose mb-4">
          Maxwell continued running 12 rounds of this experiment. In each round,
          he kept two primaries identical while changing one. He kept two of the
          three of the following primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(505)) }}>Green (515nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b> in
          all rounds of the experiment.{" "}
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The target color remained the same white throughout all rounds.
        </p>
      </div>
      <div className="max-w-xl">
        <h2 className={`${rubikCube.className} text-4xl mt-16 mb-4`}>
          Maxwell's Results
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          The following were Maxwell's results of running the experiment 12
          times. In each round, he changed one of the primaries.
        </p>
        <div className="max-w-xl mb-4">
          <MatchingTable colors={getColors()} isRexpressed={false} />
        </div>
        <p className="max-w-prose text-xs leading-loose mb-4">
          Wavelengths with * indicate the primary that Maxwell altered for the
          round.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Maxwell then reexpressed each of these colors in terms of the three
          primaries he used throughout all rounds,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(505)) }}>Green (515nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b> .
          The math is simple algebra, but described below for clarity.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          For example, in the round in which he changed the red primary to
          orange, he got:
        </p>

        <div className="max-w-6xl mt-4 mb-4">
          <Image
            src="/Equation-1.png"
            alt="figure-1"
            width={3100}
            height={125}
          />
        </div>

        <p className="max-w-prose leading-loose mb-4 mt-8">With red he got:</p>
        <div className="max-w-6xl mt-4 mb-4">
          <Image
            src="/Equation-2.png"
            alt="figure-1"
            width={3100}
            height={125}
          />
        </div>
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mt-8 mb-2">
          Since they are both equal white, we can make the two equations equal.
        </p>
      </div>
      <div className="max-w-2xl mt-4 mb-5 gap-7 flex-col">
        <div className="max-w-8xl mt-4 mb-4">
          <Image
            src="/Equation-3.png"
            alt="figure-1"
            width={4325}
            height={125}
          />
        </div>
      </div>
      <p className="max-w-prose left leading-loose mt-4 mb-2">
        ...and make the equation equal to{" "}
        <b style={{ color: rgbToCSSStyle(nmToRGB(595)) }}>Orange (595nm)</b>.
      </p>
      <div className="max-w-2xl mt-2 mb-5 gap-7 flex-col">
        <div className="max-w-8xl mt-4 mb-5">
          <Image
            src="/Equation-4.png"
            alt="figure-1"
            width={4325}
            height={125}
          />
        </div>
        <div className="max-w-8xl mt-4 mb-5">
          <Image
            src="/Equation-5.png"
            alt="figure-1"
            width={4325}
            height={125}
          />
        </div>
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Finally, the figures were normalized so the variable primary was
          normalized to 1.
        </p>
        <div className="max-w-sm mt-2 mb-4">
          <Image
            src="/Equation-6.png"
            alt="figure-1"
            width={1850}
            height={125}
          />
        </div>
        <p className="max-w-prose leading-loose mb-4 mt-12">
          Maxwell rewrote all of the colors in terms of the three consistent
          primaries.
        </p>
        <div className="max-w-xl mb-4">
          <MatchingTable colors={getReExpressedColors()} isRexpressed={true} />
        </div>
        <p className="max-w-prose leading-loose mb-4">
          Plotting the figures above onto a chart looks like the following. We
          see that Maxwell proved that given three primaries, we can reproduce a
          full range of colors — the Trichromatic theory!{" "}
          <b>
            Our eyes and brains can perceive a range of colors as a combination
            of just three colors.
          </b>
        </p>
      </div>
      <div className="max-w-xl mt-12 mb-12">
        <Image
          src="/plotted-results.png"
          alt="figure-1"
          width={8250}
          height={5196}
        />
      </div>
      <p className="max-w-prose leading-loose mb-4">
        Using this chart, we know the formula for "recreating" a spectrum of
        colors using just a set of three primaries. Even the colors not directly
        measured in the experiment can interpolated.
      </p>
      <p className="max-w-prose leading-loose mb-4">
        Today, we rely on a chart created by the{" "}
        <a
          href="https://en.wikipedia.org/wiki/International_Commission_on_Illumination"
          target="_blank"
        >
          CIE (International Commission on Illumination)
        </a>{" "}
        — the{" "}
        <a
          href="https://en.wikipedia.org/wiki/CIE_1931_color_space"
          target="_blank"
        >
          CIE 1931 RGB color matching function
        </a>{" "}
        — which is at the foundation of today's color science. This function was
        created using high-precision equipment and precise experiments.
      </p>
      <p className="max-w-prose leading-loose mb-4">
        What's incredible is how closely Maxwell's experiments resemble the CIE
        Color Matching Functions! Maxwell was able to do all this using
        elementary tools.
      </p>
      <div className="max-w-3xl mt-12 mb-12">
        <Image
          src="/maxwell-results.png"
          alt="figure-1"
          width={5180}
          height={2072}
        />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Although the spotlight of laying the foundations for the trichromatic
          theory is often given to Thomas Young and Helmhotz, we cannot deny the
          work that Maxwell had to create the foundations of color science.
        </p>
      </div>
      {/* Ending Notes */}
      <div className="max-w-xl">
        <h2 className={`${rubikCube.className} text-4xl mt-16 mb-4`}>
          End Notes
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          It's important to note that in the simulation above, there are
          limitations to the colors that are displayed. Specifically, Maxwell
          conducted his experiment using colors that cannot be represented on a
          computer screen (out of gamut). The simulation is intended to give an
          intuition and understanding of the color matching experiment that
          Maxwell conducted, but, it is not meant to be an accurate
          reproduction.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Another limitation to the simulations is that the interaction between
          the light rays and prisms are not modeled using physics but are
          innacurate depections for illustative purposes.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The methodology I used to render the colors is to convert the
          wavelengths to XYZ color space using the wavelength to XYZ table in
          CIE's Colorimetry Report. In XYZ space, I weigh and sum the colors
          from the three slit positions. Afterward, the XYZ values are converted
          into sRGB, and gamma correction is applied. In this web interaction,
          the RGB values are displayed. Any XYZ values that are out of gamut
          have been clipped.
        </p>
      </div>
      {/* Credits Section */}
      <div className="max-w-xl">
        <h2 className={`${rubikCube.className} text-4xl mt-16 mb-4`}>
          Credits
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          <a
            href="https://profiles.stanford.edu/brian-wandell"
            className="underline"
          >
            Professor Brian Wandell
          </a>{" "}
          for all of of our discussions and enthusiasm around Maxwell's
          experiments, and guiding me through this project from start to finish.
          It is also Brian's enthusiasm to bring the spotlight to Maxwell for
          his contributions to the trichromacy theory.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <b>Psych 221 class / ISETCAM</b>
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The{" "}
          <a
            href="https://onlinelibrary.wiley.com/doi/abs/10.1002/col.5080180411"
            className="underline"
          >
            Commentary by Qasim Zaidi - Department of Psychology Columbia
            University New York. New York 10027
          </a>{" "}
          was core to understanding Maxwell's original paper
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <a
            href="https://cielab.xyz/pdf/cie.15.2004%20colorimetry.pdf"
            className="underline"
          >
            CIE Colorimetry Report
          </a>{" "}
          - 3rd Edition - Table T.5. CIE 1964 standard colorimetric observer for
          the wavelength to XYZ conversions
        </p>
        <p className="max-w-prose leading-loose mb-4">
          {" "}
          <a
            href="https://en.wikipedia.org/wiki/SRGB#From_CIE_XYZ_to_sRGB"
            className="underline"
          >
            XYZ to sRGB Conversion formulas
          </a>{" "}
          on Wikipedia for building the simulation
        </p>
      </div>
    </main>
  );
}
