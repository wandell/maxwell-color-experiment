"use client";

import Image from "next/image";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

export default function Home() {
  // States of the position of slit 1, slit 2, etc.
  const [s1nm, sets1nm] = useState<number>(380);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>
          <p>{s1nm}</p>
        </div>

        <Slider step={5} onChange={handleSliderChange} min={380} max={780} />
      </div>
    </main>
  );
}
