import { ColorRowData } from "../interfaces/color-row-interface";
import ColorBox from "./ColorBox";

// Function to determine the maximum weight for scaling purposes
const getMaxWeight = (colors: ColorRowData[]): number => {
  return Math.max(
    ...colors.flatMap((row) => [
      row.slit1.weight,
      row.slit2.weight,
      row.slit3.weight,
    ])
  );
};

export default function MatchingTable({ colors }: { colors: ColorRowData[] }) {
  const maxWeight = getMaxWeight(colors); // Get the max weight to scale the bars

  return (
    <table className="table-fixed border-collapse border-gray-200 border-spacing-0">
      <thead>
        <tr className="text-left">
          {/* <th className="w-[250px]"> </th> */}
          <th className="w-[150px]">Slit 1</th>
          <th className="w-[30px]"></th>
          <th className="w-[150px]">Slit 2</th>
          <th className="w-[30px]"></th>
          <th className="w-[150px]">Slit 3</th>
          <th className="w-[30px]"></th>
          <th className="w-[50px]">Target</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((colorRow, index) => (
          <tr key={index} className="pt-3 border-y border-gray-200">
            {/* <td>
              <div className="flex gap-2 pt-2 pb-2">
                <ColorBox
                  color={`rgb(${colorRow.base.rgbColor.join(",")})`}
                  weight={0}
                />
                {colorRow.base.name}
              </div>
            </td> */}
            {/* Render the color bar for slit 1 with width based on its weight */}
            <td>
              <div className="flex gap-2 pt-2 pb-2">
                <div className="w-8">
                  {colorRow.slit1.weight == 0 ? " " : colorRow.slit1.weight}
                </div>
                <ColorBox
                  color={`rgb(${colorRow.slit1.rgbColor.join(",")})`}
                  weight={colorRow.slit1.weight}
                />
              </div>
            </td>
            {/* + Symbol */}
            <td>
              <div className="flex text-center gap-2 pt-2 pb-2 h-[43px]">
                <p className="text-center">+</p>
              </div>
            </td>
            {/* Render the color bar for slit 2 with width based on its weight */}
            <td>
              <div className="flex gap-2 pt-2 pb-2">
                <div className="w-8">
                  {colorRow.slit2.weight == 0 ? " " : colorRow.slit2.weight}
                </div>
                <ColorBox
                  color={`rgb(${colorRow.slit2.rgbColor.join(",")})`}
                  weight={colorRow.slit2.weight}
                />
              </div>
            </td>
            {/* + Symbol */}
            <td>
              <div className="flex text-center gap-2 pt-2 pb-2 h-[43px]">
                <p className="text-center">+</p>
              </div>
            </td>
            {/* Render the color bar for slit 3 with width based on its weight */}
            <td>
              <div className="flex gap-2 pt-2 pb-2">
                <div className="w-8">
                  {colorRow.slit3.weight == 0 ? " " : colorRow.slit3.weight}
                </div>
                <ColorBox
                  color={`rgb(${colorRow.slit3.rgbColor.join(",")})`}
                  weight={colorRow.slit3.weight}
                />
              </div>
            </td>
            {/* = Symbol */}
            <td>
              <div className="flex text-center gap-2 pt-2 pb-2 h-[43px]">
                <p className="text-center">=</p>
              </div>
            </td>
            {/* Target Cell */}
            <td>
              <div className="flex gap-2 pt-2 pb-2">
                <ColorBox color={`rgb(255,255,255)`} weight={25} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
