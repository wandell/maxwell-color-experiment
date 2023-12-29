import { nmToRGB } from "../helper/color-conversion";
import { ColorRowData } from "../interfaces/color-row-interface";
import ColorBox from "./ColorBox";

// Function to determine the maximum weight for scaling purposes
const getMaxWeight = (
  p1weight: number,
  p2weight: number,
  p3weight: number
): number => {
  return Math.max(p1weight, p2weight, p3weight);
};

export default function ColorEquation({
  p1nm,
  p1weight,
  p2nm,
  p2weight,
  p3nm,
  p3weight,
  targetrgb,
}: {
  p1nm: number;
  p1weight: number;
  p2nm: number;
  p2weight: number;
  p3nm: number;
  p3weight: number;
  targetrgb: number[];
}) {
  const maxWeight = getMaxWeight(p1weight, p2weight, p3weight); // Get the max weight to scale the bars

  return (
    <div className="border-2 rounded-lg p-1 border-[#CDCDCD]">
      <table className="table-fixed">
        <tbody>
          <tr className="pt-3 border-gray-200">
            {/* Render the color bar for slit 1 with width based on its weight */}
            <td>
              <div className="flex gap-2 pt-2 pb-2 w-[120px] items-center">
                <div className="flex-col">
                  <div className="w-11 text-right">{p1weight}</div>
                  <div className="w-11 text-right text-xs text-gray-400 whitespace-nowrap mt-[-5px]">
                    {p1nm}nm
                  </div>
                </div>
                <ColorBox
                  color={`rgb(${nmToRGB(p1nm).join(",")})`}
                  weight={p1weight}
                  border={false}
                  max={64}
                />
              </div>
            </td>
            {/* + Symbol */}
            <td>
              <div className="flex text-center gap-2 pt-2 pb-2 h-[43px]">
                <p className="text-center leading-[25px]">+</p>
              </div>
            </td>
            {/* Render the color bar for slit 2 with width based on its weight */}
            <td>
              <div className="flex gap-2 pt-2 pb-2 w-[120px] items-center">
                <div className="flex-col">
                  <div className="w-11 text-right">{p2weight}</div>
                  <div className="w-11 text-right text-xs text-gray-400 whitespace-nowrap mt-[-5px]">
                    {p2nm}nm
                  </div>
                </div>
                <ColorBox
                  color={`rgb(${nmToRGB(p2nm).join(",")})`}
                  weight={p2weight}
                  border={false}
                  max={64}
                />
              </div>
            </td>
            {/* + Symbol */}
            <td>
              <div className="flex text-center gap-2 pt-2 pb-2 h-[43px]">
                <p className="text-center leading-[25px]">+</p>
              </div>
            </td>
            {/* Render the color bar for slit 3 with width based on its weight */}
            <td>
              <div className="flex gap-2 pt-2 pb-2 w-[120px] items-center">
                <div className="flex-col">
                  <div className="w-11 text-right">{p3weight}</div>
                  <div className="w-11 text-right text-xs text-gray-400 whitespace-nowrap mt-[-5px]">
                    {p3nm}nm
                  </div>
                </div>
                <ColorBox
                  color={`rgb(${nmToRGB(p3nm).join(",")})`}
                  weight={p3weight}
                  border={false}
                  max={64}
                />
              </div>
            </td>
            {/* = Symbol */}
            <td>
              <div className="flex text-center gap-2 pt-2 pb-2 h-[43px]">
                <p className="text-center leading-[25px]">=</p>
              </div>
            </td>
            {/* Target Cell */}
            <td>
              <div className="flex gap-2 pt-2 pb-2 mr-4 ml-4">
                <ColorBox
                  color={`rgb(${targetrgb.join(",")})`}
                  // Hack to get the target cell to render as a square
                  weight={(25 * 100) / 64}
                  border={true}
                  max={64}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
