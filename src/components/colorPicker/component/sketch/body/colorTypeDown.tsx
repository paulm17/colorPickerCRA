import React, { useContext, useState, useRef, useEffect } from "react";
import { CPContext } from "../../../Context";

const Dropdown = () => {
  const container = useRef(null) as any;
  const [show, setShow] = useState(false);
  const { color, showAlpha } = useContext(CPContext);
  const typesWithAlpha = ["hexa", "rgba", "hsla", "hsva", "cmyk"];
  const typesWithoutAlpha = ["hex", "rgb", "hsl", "hsv", "cmyk"];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!container.current.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [show, container]);

  const changeColor = (e: React.MouseEvent<HTMLElement>, type: string) => {
    e.preventDefault();
    setShow(false);

    //let color = props.color
    //color.type = type

    //props.setColor(color)
  };

  //console.log("ColorTypeDown rendering")

  return (
    <>
      <div ref={container} className="flex flex-wrap">
        <div className="w-full">
          <div className="relative inline-flex align-middle w-full">
            <button
              className={`text-white font-bold uppercase text-xs ml-1 mt-0.5 px-2 py-2 outline-none focus:outline-none ${
                !show ? "bg-gray-400" : "bg-gray-600"
              }`}
              style={{ transition: "all .15s ease" }}
              type="button"
              onClick={() => setShow(!show)}
            >
              <div className="flex">
                <span className="inline-flex">{color.type}</span>
                <span className="inline-flex ml-1 mt-0.5">D</span>
              </div>
            </button>
            <div
              className="absolute top-full left-0 bg-white text-base z-50 py-2 px-2 mt-1 text-left rounded-md shadow-lg"
              style={{ display: show ? "block" : "none" }}
            >
              {showAlpha &&
                typesWithAlpha.map((type, idx) => {
                  return (
                    <a
                      key={idx}
                      href="/alpha"
                      className={`text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap text-black hover:bg-gray-300 ${
                        color.type === type ? "bg-gray-400" : ""
                      }`}
                      onClick={(e) => changeColor(e, type)}
                    >
                      {type.toUpperCase()}
                    </a>
                  );
                })}
              {!showAlpha &&
                typesWithoutAlpha.map((type, idx) => {
                  return (
                    <a
                      key={idx}
                      href="/alpha"
                      className={`text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap text-black hover:bg-gray-300 ${
                        color.type === type ? "bg-gray-400" : ""
                      }`}
                      onClick={(e) => changeColor(e, type)}
                    >
                      <span
                        className={`block ${
                          color.type === type ? "bg-gray-400" : ""
                        }`}
                      >
                        {type.toUpperCase()}
                      </span>
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
