import React, { Dispatch, SetStateAction, useState } from "react";
import { ColorObj, Gradient, SliderDirection } from "./component/types";

export interface Context {
  isVisible: boolean;
  color: ColorObj;
  gradient: Gradient;
  sliderDirection: SliderDirection;
  showGradient: boolean;
  showAlpha: boolean;
  showClear: boolean;
  showPresets: boolean;
  showColorType: boolean;
  disableFields: boolean;
  zIndex: number;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setColor: Dispatch<SetStateAction<ColorObj>>;
  setGradient: Dispatch<SetStateAction<Gradient>>;
  setSliderDirection: Dispatch<SetStateAction<SliderDirection>>;
  setShowGradient: Dispatch<SetStateAction<boolean>>;
  setShowAlpha: Dispatch<SetStateAction<boolean>>;
  setShowClear: Dispatch<SetStateAction<boolean>>;
  setShowPresets: Dispatch<SetStateAction<boolean>>;
  setShowColorType: Dispatch<SetStateAction<boolean>>;
  setDisableFields: Dispatch<SetStateAction<boolean>>;
  setZIndex: Dispatch<SetStateAction<number>>;
}

const CPContext = React.createContext({} as Context);

const CPProvider = ({ children }: any) => {
  const [isVisible, setVisible] = useState(false);
  const [color, setColor] = useState<ColorObj>({} as ColorObj);
  const [gradient, setGradient] = useState<Gradient>({} as Gradient);
  const [sliderDirection, setSliderDirection] = useState<SliderDirection>(
    "vertical"
  );
  const [showGradient, setShowGradient] = useState(false);
  const [showAlpha, setShowAlpha] = useState(false);
  const [showClear, setShowClear] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showColorType, setShowColorType] = useState(false);
  const [disableFields, setDisableFields] = useState(false);
  const [zIndex, setZIndex] = useState(10);

  return (
    <CPContext.Provider
      value={{
        isVisible,
        color,
        gradient,
        sliderDirection,
        showGradient,
        showAlpha,
        showClear,
        showPresets,
        showColorType,
        disableFields,
        zIndex,
        setVisible,
        setColor,
        setGradient,
        setSliderDirection,
        setShowGradient,
        setShowAlpha,
        setShowClear,
        setShowPresets,
        setShowColorType,
        setDisableFields,
        setZIndex,
      }}
    >
      {children}
    </CPContext.Provider>
  );
};

export { CPProvider, CPContext };
