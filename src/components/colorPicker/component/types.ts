import { MutableRefObject } from "react";

type theme = "default" | "compact";
export type Color = string | object;
export type Gradient = string | object | null;
export type SliderDirection = "horizontal" | "vertical";
export type DropDownCoords = {
  top?: number | string;
  left: number | string;
  bottom?: number | string;
};

export interface colorPickerProps {
  theme: theme;
  className: string;
  color: Color;
  showGradient?: boolean;
  showAlpha?: boolean;
  showClear?: boolean;
  showPresets?: boolean;
  showColorType?: boolean;
  disableFields?: boolean;
  sliderDirection?: SliderDirection;
  zIndex?: number;
  width: number;
}

export interface DropDownProps {
  theme: theme;
  dropDownRef: MutableRefObject<HTMLElement | null>;
}

export interface SketchProps {
  dropDownRef: MutableRefObject<HTMLElement | null>;
  width: number;
}

export type colorType = "cmyk" | "rgba" | "hsla" | "hsva" | "hexa";

export interface ColorObj {
  h: number;
  s: number;
  v: number;
  a: number | undefined;
  clone: () => void;
  toHSVA(): Number[];
  toHSLA(): Number[];
  toRGBA(): Number[];
  toCMYK(): Number[];
  toHEXA(): string[];
  type: colorType;
}
