import { nmToRGB } from "../helper/color-conversion";
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

export default function MatchingTable({
  colors,
  isRexpressed,
}: {
  colors: ColorRowData[];
  isRexpressed: boolean;
}) {
  const maxWeight = getMaxWeight(colors); // Get the max weight to scale the bars

  return (
    <table className="table-fixed border-collapse border-gray-200 border-spacing-0">
      <thead>
        <tr className="text-left">
          {/* <th className="w-[250px]"> </th> */}
          <th className="w-[150px]">
            {isRexpressed ? (
              <div>
                <div>Primary 1</div>
                <div className="text-gray-400 text-sm font-normal">620nm</div>
              </div>
            ) : (
              `Slit 1`
            )}
          </th>
          <th className="w-[30px]"></th>
          <th className="w-[150px]">
            {" "}
            {isRexpressed ? (
              <div>
                <div>Primary 2</div>
                <div className="text-gray-400 text-sm font-normal">515nm</div>
              </div>
            ) : (
              `Slit 2`
            )}
          </th>
          <th className="w-[30px]"></th>
          <th className="w-[150px]">
            {" "}
            {isRexpressed ? (
              <div>
                <div>Primary 3</div>
                <div className="text-gray-400 text-sm font-normal">445nm</div>
              </div>
            ) : (
              `Slit 3`
            )}
          </th>
          <th className="w-[30px]"></th>
          <th className="w-[50px]">{isRexpressed ? `` : `Target`}</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((colorRow, index) => (
          <tr key={index} className="pt-3 border-y border-gray-200">
            {/* Render the color bar for slit 1 with width based on its weight */}
            <td>
              <div className="flex gap-2 pt-1 pb-1 w-[120px] items-center">
                <div className="flex-col">
                  <div className="w-11 text-right text-sm">
                    {colorRow.slit1.weight < 0
                      ? `(${colorRow.slit1.weight})`
                      : colorRow.slit1.weight}
                  </div>
                  {isRexpressed ? (
                    <div></div>
                  ) : colorRow.slit1.nm != 620 ? (
                    <div className="w-11 text-right text-xs text-gray-600 whitespace-nowrap mt-[-3px]">
                      {colorRow.slit1.nm}nm*
                    </div>
                  ) : (
                    <div className="w-11 text-right text-xs text-gray-400 whitespace-nowrap mt-[-3px]">
                      {colorRow.slit1.nm}nm
                    </div>
                  )}
                </div>
                <ColorBox
                  color={`rgb(${nmToRGB(colorRow.slit1.nm).join(",")})`}
                  weight={colorRow.slit1.weight}
                  border={false}
                  max={isRexpressed ? 5000 : 100}
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
              <div className="flex gap-2 pt-1 pb-1 w-[120px] items-center">
                <div className="flex-col">
                  <div className="w-11 text-right text-sm">
                    {colorRow.slit2.weight < 0
                      ? `(${colorRow.slit2.weight})`
                      : colorRow.slit2.weight}
                  </div>
                  {isRexpressed ? (
                    <div></div>
                  ) : colorRow.slit2.nm != 515 ? (
                    <div className="w-11 text-right text-xs text-gray-600 whitespace-nowrap mt-[-3px]">
                      {colorRow.slit2.nm}nm*
                    </div>
                  ) : (
                    <div className="w-11 text-right text-xs text-gray-400 whitespace-nowrap mt-[-3px]">
                      {colorRow.slit2.nm}nm
                    </div>
                  )}
                </div>
                <ColorBox
                  color={`rgb(${nmToRGB(colorRow.slit2.nm).join(",")})`}
                  weight={colorRow.slit2.weight}
                  border={false}
                  max={isRexpressed ? 5000 : 100}
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
              <div className="flex gap-2 pt-1 pb-1 w-[120px] items-center">
                <div className="flex-col">
                  <div className="w-11 text-right text-sm">
                    {colorRow.slit3.weight < 0
                      ? `(${colorRow.slit3.weight})`
                      : colorRow.slit3.weight}
                  </div>
                  {isRexpressed ? (
                    <div></div>
                  ) : colorRow.slit3.nm != 445 ? (
                    <div className="w-11 text-right text-xs text-gray-600 whitespace-nowrap mt-[-3px]">
                      {colorRow.slit3.nm}nm*
                    </div>
                  ) : (
                    <div className="w-11 text-right text-xs text-gray-400 whitespace-nowrap mt-[-3px]">
                      {colorRow.slit3.nm}nm
                    </div>
                  )}
                </div>
                <ColorBox
                  color={`rgb(${nmToRGB(colorRow.slit3.nm).join(",")})`}
                  weight={colorRow.slit3.weight}
                  border={false}
                  max={isRexpressed ? 5000 : 100}
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
                <ColorBox
                  color={
                    isRexpressed
                      ? `rgb(${nmToRGB(colorRow.base.nm).join(",")})`
                      : `rgb(255,255,255)`
                  }
                  weight={25}
                  border={true}
                  max={100}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
