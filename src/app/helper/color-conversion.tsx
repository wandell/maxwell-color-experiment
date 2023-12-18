import conversionTable from "./cie-conversion-table";

const nmToXYZTable = conversionTable();

// Function written by ChatGPT
export const xyzToRgb = (
  x: number,
  y: number,
  z: number
): [number, number, number] => {
  // From Wikipedia:
  // The CIE XYZ values must be scaled so that the Y of D65 ("white") is 1.0 (X = 0.9505, Y = 1.0000, Z = 1.0890).
  // This is usually true but some color spaces use 100 or other values (such as in CIELAB, when using specified white points).

  // const X = x / 0.9505;
  // const Y = y / 1.0;
  // const Z = z / 1.089;

  // Without the scaling
  const X = x;
  const Y = y;
  const Z = z;

  // Apply the linear transformation
  let R = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
  let G = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
  let B = X * 0.0557 + Y * -0.204 + Z * 1.057;

  // Apply gamma correction
  R = R <= 0.0031308 ? 12.92 * R : 1.055 * Math.pow(R, 1 / 2.4) - 0.055;
  G = G <= 0.0031308 ? 12.92 * G : 1.055 * Math.pow(G, 1 / 2.4) - 0.055;
  B = B <= 0.0031308 ? 12.92 * B : 1.055 * Math.pow(B, 1 / 2.4) - 0.055;

  // Clip the values to the range [0, 1] and convert to the range [0, 255]
  const clip = (v: number) => Math.min(Math.max(v, 0), 1);
  R = Math.round(clip(R) * 255);
  G = Math.round(clip(G) * 255);
  B = Math.round(clip(B) * 255);

  return [R, G, B];
};

// Currently only takes the combination of 2 XYZ
export const combineXYZ = (
  XYZ1: number[],
  XYZ2: number[],
  XYZ3: number[],
  s1Size: number,
  s2Size: number,
  s3Size: number
) => {
  const combinedX =
    (XYZ1[0] * s1Size) / 100 +
    (XYZ2[0] * s2Size) / 100 +
    (XYZ3[0] * s3Size) / 100;
  const combinedY =
    (XYZ1[1] * s1Size) / 100 +
    (XYZ2[1] * s2Size) / 100 +
    (XYZ3[1] * s3Size) / 100;
  const combinedZ =
    (XYZ1[2] * s1Size) / 100 +
    (XYZ2[2] * s2Size) / 100 +
    (XYZ3[2] * s3Size) / 100;

  return [combinedX, combinedY, combinedZ];
};

export const nmToRGB = (value: number) => {
  const XYZValues = nmToXYZTable[value];
  const RGB = xyzToRgb(XYZValues[0], XYZValues[1], XYZValues[2]);
  // console.log(RGB);
  return RGB;
};

export const nmToRGBMixed = (
  value1: number,
  value2: number,
  value3: number,
  s1Size: number,
  s2Size: number,
  s3Size: number
) => {
  const XYZValues1 = nmToXYZTable[value1];
  const XYZValues2 = nmToXYZTable[value2];
  const XYZValues3 = nmToXYZTable[value3];

  const combinedXYZ = combineXYZ(
    XYZValues1,
    XYZValues2,
    XYZValues3,
    s1Size,
    s2Size,
    s3Size
  );

  const RGB = xyzToRgb(combinedXYZ[0], combinedXYZ[1], combinedXYZ[2]);
  // console.log(RGB);
  return RGB;
};

// Helper Functions for creating CSS for colors
export const rgbToCSSStyle = (rgb: number[]) => {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`; // Use redValue for the red color value
};
