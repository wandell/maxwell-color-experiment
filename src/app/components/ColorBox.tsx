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
}: {
  color: string;
  weight: number;
}) {
  //   const maxWeight = getMaxWeight(colors); // Get the max weight to scale the bars

  return (
    <div
      style={{
        backgroundColor: color,
        borderColor: "#CCCCCC",
        borderWidth: color == "rgb(255,255,255)" ? 1 : 0,
        height: 25,
        width: weight == 0 ? 25 : weight,
        borderRadius: 4,
      }}
    ></div>
  );
}
