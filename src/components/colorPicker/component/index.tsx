import { useContext, memo } from "react";
import { CPProvider, CPContext } from "../Context";
import { useRef, useEffect } from "react";
import ClickAwayListener from "react-click-away-listener";
import DropDown from "./dropDown";
import Sketch from "./sketch";
import { HSVaColor } from "./utils/hsvacolor.js";
import { parseToHSVA } from "./utils/color.js";
import { parseGradient } from "./utils/parseGradient.js";
import { colorPickerProps, colorType } from "./types";

const ColorPickerComponent = memo((props: colorPickerProps) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const {
    setVisible,
    setColor,
    setGradient,
    setShowGradient,
    setShowAlpha,
    setShowClear,
    setShowPresets,
    setShowColorType,
    setDisableFields,
    setZIndex,
    setSliderDirection,
  } = useContext(CPContext);

  useEffect(() => {
    // Check if null
    if (props.color !== null) {
      let colorString = props.color;

      // Find out whether color is solid or gradient
      const parsed = parseGradient(colorString);

      if (!parsed || parsed.stops.length < 2) {
        // Color is solid
        setGradient(null);
      } else {
        //setGradient(parsed.str)
        //setShowGradient(true)
        //colorString = parsed.stops[0].color
      }

      const { values, type } = parseToHSVA(colorString);

      // If no opacity is applied, add undefined at the very end which gets
      // Set to 1 in setHSVA
      if (values && values.length === 3) {
        values[3] = undefined;
      }

      const newColor = { ...HSVaColor(...values), type: type as colorType };
      setColor(newColor);
    }
  }, [props.color, setColor, setGradient]);

  useEffect(() => {
    if (props.showGradient) {
      setShowGradient(props.showGradient);
    }
    if (props.showAlpha) {
      setShowAlpha(props.showAlpha);
    }
    if (props.showClear) {
      setShowClear(props.showClear);
    }
    if (props.showPresets) {
      setShowPresets(props.showPresets);
    }
    if (props.showColorType) {
      setShowColorType(props.showColorType);
    }
    if (props.disableFields) {
      setDisableFields(props.disableFields);
    }
    if (props.zIndex) {
      setZIndex(props.zIndex);
    }
    if (props.sliderDirection) {
      setSliderDirection(props.sliderDirection);
    }
  }, [
    props.disableFields,
    props.showAlpha,
    props.showClear,
    props.showColorType,
    props.showGradient,
    props.showPresets,
    props.sliderDirection,
    props.zIndex,
    setDisableFields,
    setShowAlpha,
    setShowClear,
    setShowColorType,
    setShowGradient,
    setShowPresets,
    setSliderDirection,
    setZIndex,
  ]);

  return (
    <div className={`relative ${props.className}`}>
      <ClickAwayListener onClickAway={() => setVisible(false)}>
        <div>
          <DropDown theme={props.theme} dropDownRef={dropDownRef}></DropDown>
          <Sketch dropDownRef={dropDownRef} width={props.width}></Sketch>
        </div>
      </ClickAwayListener>
    </div>
  );
});

export const ColorPicker = (props: colorPickerProps) => {
  return (
    <CPProvider>
      <ColorPickerComponent {...props}></ColorPickerComponent>
    </CPProvider>
  );
};
