import { RefObject, useContext, useMemo } from "react";
import { CPContext } from "../Context";
import { DropDownProps } from "./types";
import style from "./style.module.css";

function DropDown(props: DropDownProps) {
  const handleCSS = props.theme === "default" ? "block" : "hidden";
  const { color, gradient, setVisible } = useContext(CPContext);
  const toggle = () => {
    setVisible((prevState) => !prevState);
  };
  const bgColor = useMemo(() => {
    if (Object.entries(color).length !== 0 && gradient == null) {
      return { background: color.toRGBA().toString() };
    } else {
      return { background: gradient };
    }
  }, [color, gradient]);

  return (
    <div
      ref={props.dropDownRef as RefObject<HTMLDivElement>}
      className="m-0 overflow-hidden cursor-pointer p-1 flex w-full bg-gray-400 text-gray-800 items-center justify-center outline-none"
      onClick={() => toggle()}
    >
      <div className="relative h-7 z-0 flex-1 border-2 border-gray-300">
        <div className={style.cpPreviewInner} style={bgColor as any}></div>
      </div>
      <div
        className={`${handleCSS} text-xs h-4 leading-4 m-1.5 py-0.5 px-0 z-1`}
      >
        &#9660;
      </div>
    </div>
  );
}

export default DropDown;
