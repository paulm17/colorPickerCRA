import { useContext, useMemo } from "react";
import { CPContext } from "../../../Context";
import DropDown from "./colorTypeDown";
import style from "../../style.module.css";

function InputFields() {
  const { color, disableFields, showColorType } = useContext(CPContext);

  const bgColor = useMemo(() => {
    if (Object.entries(color).length !== 0) {
      return color.toRGBA().toString();
    }
  }, [color]);

  const colorStr = useMemo(() => {
    if (Object.entries(color).length !== 0) {
      //const method: any = `to${color.type.toUpperCase()}`
      //return color[method]().toString()
      return color.toRGBA().toString();
    }
  }, [color]);

  const onColorStrChange = (event: any) => {
    console.log(event.target.value);
  };

  return (
    <div className="flex flex-row mt-1">
      <div className="w-10 mr-1">
        <div
          className={`relative h-9 rounded overflow-hidden ${style.cpChessboard}`}
          style={{ background: bgColor }}
        ></div>
      </div>
      <div className="w-11/12">
        <div className="flex flex-row">
          <input
            className="px-1 py-2 text-sm shadow-sm w-full text-black"
            type="text"
            value={colorStr}
            onChange={onColorStrChange}
            disabled={disableFields}
          />
          {showColorType && <DropDown></DropDown>}
        </div>
      </div>
    </div>
  );
}

export default InputFields;
