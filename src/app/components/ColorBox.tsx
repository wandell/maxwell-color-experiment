import { ColorRowData } from "../interfaces/color-row-interface";

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

export default function ColorBox({
  color,
  weight,
  border,
  max,
}: {
  color: string;
  weight: number;
  border: boolean;
  max: number;
}) {
  //   const maxWeight = getMaxWeight(colors); // Get the max weight to scale the bars

  // This is a value for scaling to
  const maxWidth = max;
  const scaleFactor = maxWidth / 100;

  return (
    <div
      style={{
        backgroundColor: color,
        borderColor: "#CCCCCC",
        borderWidth: color == "rgb(255,255,255)" || border == true ? 1 : 0,
        height: 25,
        width: weight * scaleFactor,
        borderRadius: 4,
      }}
    ></div>
  );
}
