/* eslint-disable react/no-unescaped-entities */
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
import MaxwellApparatusWrapper from "./components/MaxwellApparatusWrapper";
import { nmToRGB } from "./helper/color-conversion";

export default function Home() {
  const defaultSlitWidth = 30;
  const defaultRed = 620;
  const defaultGreen = 520;
  const defaultBlue = 445;

  const nmToXYZTable = conversionTable();

  const rgbToCSSStyle = (rgb: number[]) => {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`; // Use redValue for the red color value
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
        <hr className="m-4 solid" />

        <p className="max-w-prose leading-loose">
          <b>Note:</b> This is still a draft before being published for the
          public.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Koh will clean up all the content before opening it to the public.{" "}
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <i>
            <b>Last Updated:</b> 15:30 Monday, December 18, 2023 (PST)
          </i>
        </p>

        <hr className="m-4 solid" />

        <p className="max-w-prose leading-loose mb-4">
          In the annals of scientific history, James Clerk Maxwell's
          contributions stand as monumental milestones, not just in the realm of
          electromagnetic waves but also in the vibrant world of color theory.
          His pioneering experiments, a harmonious blend of physics and
          perception, have laid the foundational stones for our understanding of
          color and light.
        </p>
        <p
          className={`italic ${inter.className} text-s max-w-prose text-gray-400`}
        >
          Written by Koh Terai as a part of PSYCH221: Image Systems Engineering,
          Fall 2023 at Stanford University, taught by Professor Brian Wandell.
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
          We will walk through the components of the tool step by step and how
          the tool worked before going into the actual stages of the experiment
          that Maxwell conducted.
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
          Imagine if you shined a full spectrum white light from the viewing
          hole at the bottom. The white light would be dispersed through the two
          prisms, creating a pure spectrum to the left.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          This setup with the prisms allows us to convert white light into a
          pure spectrum.
        </p>
      </div>
      <div className="max-w-6xl mt-12">
        <Image src="/figure-2a.png" alt="figure-1" width={5032} height={1524} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now imagine that we create slits on the left side to cover up most of
          the pure spectrum other than a specific part. We would only see a
          region of the spectrum on the other end.
        </p>
      </div>
      <div className="max-w-6xl mt-12">
        <Image src="/figure-2b.png" alt="figure-1" width={5032} height={1532} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          The next step is where the magic begins. Imagine that we{" "}
          <b>shine light from the other direction</b>. But we will only let a
          monochromatic light of 620nm in.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          As the monochromatic red light enters the inside of the apparatus,
          only some of the rays will reach the prism. Rays that hit the inner
          walls of the apparatus will be absorbed, leaving only a tiny set of
          rays that reach the prism and disperse at the correct angles to get to
          the viewing hole. By the time the rays reach the prism, we can assume
          that the rays are collimated.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          In the diagram below, we see that when the viewer looks through the
          hole, they will see that half of the hole is the color of the light we
          let in. Notice that the viewer only sees half of the hole in red. We
          will get the other half in a few steps, but with this setup, they will
          only see half of the hole as red.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2c.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
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
            only the same monochromatic red light (≈620 nm) will reach the
            viewing hole.
          </b>
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Even though we put in white light,{" "}
          <b>the color that the viewer sees is essentially the same</b> as when
          we only shined the monochromatic red light in.
        </p>
      </div>
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-2d.png" alt="figure-1" width={5312} height={1844} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          If we <b>moved the position of the slit</b> now, only a different
          wavelength of light would reach the observer. The light that reaches
          the observer corresponds to the same color of the pure spectrum formed
          when we shined white light from the viewing hole.
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
      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-3.png" alt="figure-1" width={5312} height={1804} />
      </div>
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          In the final setup, Maxwell had three slits created that let in light
          at three different positions. Since only specific wavelengths reach
          the observer from each position, Maxwell could create different
          combinations of colors by combining three distinct wavelengths.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The width of each slit was also adjustable while keeping the center of
          the slit fixed. Widening and narrowing the slit width would allow
          Maxwell to control the intensity of a given color.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Although, strictly speaking, widening slit width could increase the
          range of wavelengths that reach the observer, in our experiment, we
          will assume that this setup allows us to select specific wavelengths
          for the viewer to see. Effectively each slit creates a monochromatic
          light for our experiment.
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
          positions correspond to. (Note that the actual color of the light that
          enters is white, and the white light only gets split into individual
          colors after the prisms disperse the light.)
        </p>
      </div>

      <div className="max-w-6xl mt-12 mb-12">
        <Image src="/figure-4b.png" alt="figure-1" width={5312} height={1804} />
      </div>

      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now we're set! We now have all the essential parts of the tool Maxwell
          used for his experiment.
        </p>
      </div>

      {/* The Experiment */}
      <div className="max-w-xl">
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>
          The Experiment
        </h2>

        <p className="max-w-prose leading-loose mb-4">
          Each round will have three primaries. For now, our tool is set at{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Scarlet (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(580)) }}> Green (520nm)</b>,
          and{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}> Blue (445nm)</b>.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          You can fiddle with the apparatus below to understand how it works.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          You can change both the slit positions and the slit widths by moving
          the sliders. The viewer sees a different color through the viewing
          hole by changing these parameters.
        </p>
      </div>

      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper p1={620} p2={520} p3={440} />
      </div>

      {/* Trial Experiment 1 */}
      <div className="max-w-xl mt-4">
        <p className="max-w-prose leading-loose mb-4">
          By adjusting the intensity of these three primaries (by changing the
          widths of the slits), your job is to match our target color, white.
        </p>

        <p className="max-w-prose leading-loose mb-4">
          The observer should be unable to distinguish the color on the left and
          right sides they see through the viewing hole.{" "}
        </p>

        <p className="max-w-prose leading-loose mb-4">
          First, try matching the left side of the view to the right side using
          the primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(580)) }}>Green (520nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b>.{" "}
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Don't adjust the slit positions, only the slit widths.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Adjust the slit widths until you can't tell the difference between the
          left and right sides of the observer view.
        </p>
      </div>
      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper p1={620} p2={520} p3={445} />
      </div>

      {/* Trial Experiment 2 */}
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
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
          using the primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(580)) }}>Green (520nm)</b>,
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
        <p className="max-w-prose leading-loose mb-4">
          Keep in mind to only adjust the slit positions, only the slit width.
        </p>
      </div>
      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper p1={620} p2={520} p3={475} />
      </div>

      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Two fascinating things just happened.
        </p>
        <ol className="list-decimal mb-4">
          <li>
            We created the same target white color with a different combination
            of primaries (two identical, one modified).
          </li>
          <li>
            Each set of 3 primaries required a slightly different amount of each
            color.
          </li>
        </ol>
        <p className="max-w-prose leading-loose mb-4">
          Maxwell continued doing this in 12 rounds. In each round, he kept two
          primaries identical while changing one. The target color remained the
          same white throughout all rounds.
        </p>
      </div>

      <div className="max-w-xl">
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>
          The Results
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          The following were Maxwell's results of running the experiment 12
          times. In each round, he changed one of the primaries.
        </p>
        <div className="max-w-xl mb-4">
          <MatchingTable colors={getColors()} />
        </div>
        <p className="max-w-prose leading-loose mb-4">
          Maxwell then reexpressed each of these colors in terms of the 3 base
          colors. The math is simple algebra, but described below for clarity.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          For example, in the round in which he changed the red primary to
          orange, he got:
        </p>

        <div className="max-w-6xl mt-4 mb-4">
          <Image src="/math-1.png" alt="figure-1" width={4661} height={286} />
        </div>

        <p className="max-w-prose leading-loose mb-4">With red he got:</p>
        <div className="max-w-6xl mt-4 mb-4">
          <Image src="/math-2.png" alt="figure-1" width={4661} height={294} />
        </div>

        <p className="max-w-prose leading-loose mb-4">
          Since they are both equal white, we can make the two equations equal
          and do some algebra.
        </p>
        <div className="max-w-8xl mt-4 mb-4">
          <Image src="/math-3.png" alt="figure-1" width={7372} height={1095} />
        </div>
        <p className="max-w-prose leading-loose mb-4">
          Maxwell rewrote all of the colors in terms of the three consistent
          primaries.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          He then charted his results onto a chart. They resemble the CIE Color
          Matching Functions with incredible accuracy!He then charted his
          results onto a chart.{" "}
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

      {/* Ending Notes */}
      <div className="max-w-xl">
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>
          Ending Notes
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          It's important to note that in the apparatus simulation I've created,
          there are limitations to the accuracy of the colors you see.
          Specifically, Maxwell did this experiment using colors not represented
          on a computer screen (out of gamut).
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
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>Credits</h2>
        <p className="max-w-prose leading-loose mb-4">
          Professor{" "}
          <a
            href="https://profiles.stanford.edu/brian-wandell"
            className="underline"
          >
            Brian Wandell
          </a>{" "}
          for all of of our discussions and enthusiasm around Maxwell's
          experiments, and guiding me through this project from start to finish.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <a
            href="https://onlinelibrary.wiley.com/doi/abs/10.1002/col.5080180411"
            className="underline"
          >
            Commentary by Qasim Zaidi
          </a>{" "}
          - Department of Psychology Columbia University New York. New York
          10027
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <a
            href="https://cielab.xyz/pdf/cie.15.2004%20colorimetry.pdf"
            className="underline"
          >
            CIE Colorimetry Report
          </a>{" "}
          - 3rd Edition - Table T.5. CIE 1964 standard colorimetric observer
        </p>
        <p className="max-w-prose leading-loose mb-4">
          {" "}
          <a
            href="https://en.wikipedia.org/wiki/SRGB#From_CIE_XYZ_to_sRGB"
            className="underline"
          >
            XYZ to sRGB Conversion
          </a>{" "}
          on Wikipedia
        </p>
      </div>
    </main>
  );
}
