import { useContext } from "react";
import { CPContext } from "../../Context";
import Saturation from "./body/saturation";
import ColorClear from "./body/colorClear";
import Hue from "./body/hue";
import Alpha from "./body/alpha";
import InputFields from "./body/inputFields";
import ColorPresets from "./body/colorPresets";
//import Gradient from "./body/gradient"

function Body() {
  const { showAlpha, showClear, showPresets } = useContext(CPContext);

  return (
    <div className="flex flex-col p-1">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Saturation></Saturation>
          <div className="flex flex-row">
            <div className="flex flex-col">
              {showClear && <ColorClear></ColorClear>}
              <div className="flex flex-row">
                <Hue></Hue>
                {showAlpha && <Alpha></Alpha>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <InputFields></InputFields>
      </div>
      <div className="flex flex-col">
        {showPresets && <ColorPresets></ColorPresets>}
      </div>
    </div>
  );
}

export default Body;
