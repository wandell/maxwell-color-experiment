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
          <b>Note:</b> This is still a draft before publishing to public.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Koh will clean up all of the content before opening to the public.{" "}
        </p>
        <p className="max-w-prose leading-loose mb-4">
          <i>
            <b>Last Updated:</b> 12:38 Monday, December 18, 2023 (PST)
          </i>
        </p>

        <hr className="m-4 solid" />

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

      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper p1={620} p2={520} p3={440} />
      </div>

      {/* Trial Experiment 1 */}
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          First, try matching the left side of the view to the right side using
          the primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(580)) }}>Green (520nm)</b>,
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b>.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Don't adjust the slit positions, only the slit weights.
        </p>
      </div>
      <div className="z-10 mt-10 max-w-6xl w-full items-center justify-between font-mono text-sm">
        <MaxwellApparatusWrapper p1={620} p2={520} p3={445} />
      </div>

      {/* Trial Experiment 2 */}
      <div className="max-w-xl">
        <p className="max-w-prose leading-loose mb-4">
          Now we will replace one of the primaries with another color. We will
          replace{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(445)) }}>Blue (445nm)</b>{" "}
          with{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(475)) }}>
            Greenish-Blue (475nm){" "}
          </b>
          . Now, try matching the left side of the view to the right side using
          the primaries{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(620)) }}>Red (620nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(580)) }}>Green (520nm)</b>,{" "}
          <b style={{ color: rgbToCSSStyle(nmToRGB(475)) }}>
            Greenish-Blue (475nm)
          </b>
          . Note that the target color (white) is still identical.
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
          You should notice 2 things. First, that you were able to create the
          same target white color with 3 different primaries. Second, that each
          set of 3 primaries required a slightly different amount of each color.
        </p>
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
        <div className="max-w-8xl mt-4 mb-4">
          <Image src="/math-3.png" alt="figure-1" width={7372} height={1095} />
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

      {/* Ending Notes */}
      <div className="max-w-xl">
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>
          Ending Notes
        </h2>
        <p className="max-w-prose leading-loose mb-4">
          It's important to note that in the apparatus simulation that I've
          created, there are limitations to the accuracy of the colors that you
          see. Specifically, Maxwell did this experiment using colors that
          cannot be represented in a computer screen (out of gamut).
        </p>
        <p className="max-w-prose leading-loose mb-4">
          The methodology I used to render the colors is to convert the
          wavelengths to XYZ color space using the wavelength to XYZ table in
          CIE's COLORIMETRY Report. In XYZ space, I weight and sum the colors
          from the three slit positions. After that, the XYZ values are
          converted into sRGB and gamma correction is applied. In this web
          interaction, the RGB values are displayed. Any XYZ values that are out
          of gamut are clipped.
        </p>
      </div>

      {/* Credits Section */}
      <div className="max-w-xl">
        <h2 className={`${biorhyme.className} text-2xl mt-16 mb-4`}>Credits</h2>
        <p className="max-w-prose leading-loose mb-4">
          Professor Bryan Wandwell for all of of our discussions and enthusism
          around Maxwell's experiments, and guiding me through this project from
          start to finish.
        </p>
        <p className="max-w-prose leading-loose mb-4">
          On the Theory of Compound Colours, and the Relations of the Colours of
          the Spectrum, By James Clerk Maxwell (1860), First published in
          Philosophical Transactions (1860)
        </p>
        <p className="max-w-prose leading-loose mb-4">
          Commentary by Qasim Zaidi - Department of Psychology Columbia
          University New York. New York 10027
        </p>
        <p className="max-w-prose leading-loose mb-4">
          CIE COLORIMETRY Report - 3rd Edition - Table T.5. CIE 1964 standard
          colorimetric observer
        </p>
        <p className="max-w-prose leading-loose mb-4">
          XYZ to sRGS Conversion formula from Wikipedia
        </p>
        <p className="max-w-prose leading-loose mb-4">
          ChatGPT for organizing my writing
        </p>
      </div>
    </main>
  );
}
