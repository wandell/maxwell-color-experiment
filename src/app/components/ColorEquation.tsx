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
  p1rgb,
  p1weight,
  p2rgb,
  p2weight,
  p3rgb,
  p3weight,
  targetrgb,
}: {
  p1rgb: number[];
  p1weight: number;
  p2rgb: number[];
  p2weight: number;
  p3rgb: number[];
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
              <div className="flex gap-2 pt-2 pb-2 w-[140px]">
                <div className="w-8 text-right">{p1weight}</div>
                <ColorBox color={`rgb(${p1rgb.join(",")})`} weight={p1weight} />
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
              <div className="flex gap-2 pt-2 pb-2 w-[140px]">
                <div className="w-8 text-right">{p2weight}</div>
                <ColorBox color={`rgb(${p2rgb.join(",")})`} weight={p2weight} />
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
              <div className="flex gap-2 pt-2 pb-2 w-[140px]">
                <div className="w-8 text-right">{p3weight}</div>
                <ColorBox color={`rgb(${p3rgb.join(",")})`} weight={p3weight} />
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
              <div className="flex gap-2 pt-2 pb-2 mr-4 ml-4">
                <ColorBox color={`rgb(${targetrgb.join(",")})`} weight={25} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
