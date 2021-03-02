import { useContext, useEffect, useRef, useMemo } from "react";
import Pointer from "./pointer";
import { HSVaColor } from "../../utils/hsvacolor.js";
import { calcXY, calcXYAlphaCursorPosition } from "../../utils/cursor.js";
import { clamp } from "../../utils/clamp";
import { CPContext } from "../../../Context";
import style from "../../style.module.css";

function Alpha() {
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, color, setColor, sliderDirection } = useContext(CPContext);
  const sliderDirectionCSS =
    sliderDirection === "horizontal"
      ? style.cpAlphaHorizontal
      : style.cpAlphaVertical;

  const pointerBgColor = useMemo(() => {
    if (Object.entries(color).length === 0) {
      return "transparent";
    }

    return `rgba(0, 0, 0, ${color.a})`;
  }, [color]);

  const pointerTop = useMemo(() => {
    if (sliderDirection === "vertical") {
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        let { y, height } = calcXYAlphaCursorPosition(
          sliderDirection,
          containerRect,
          color
        );
        const offsetHeight = Number(pointerRef.current?.offsetHeight);

        return `calc(${(y / height) * 100}% - ${offsetHeight / 2}px)`;
      }
    }

    return "-1px";
  }, [color, sliderDirection]);

  const pointerLeft = useMemo(() => {
    if (sliderDirection === "horizontal") {
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        let { x, width } = calcXYAlphaCursorPosition(
          sliderDirection,
          containerRect,
          color
        );

        return `calc(${(x / width) * 100}%)`;
      }
    }

    return "-1px";
  }, [color, sliderDirection]);

  const handleChange = (evt: any) => {
    let ex = 0,
      ey = 0;
    if (evt) {
      const touch = evt && evt.touches && evt.touches[0];
      ex = evt ? (touch || evt).clientX : 0;
      ey = evt ? (touch || evt).clientY : 0;
    }

    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      let { x, y } = calcXY(containerRect, ex, ey);
      let value = 0;

      if (sliderDirection === "horizontal") {
        value = clamp(x / containerRect.width);
      } else {
        value = clamp(y / containerRect.height);
      }

      let data = {
        h: color.h,
        s: color.s,
        v: color.v,
        a: Math.round(value * 1e2) / 100,
      };

      const newColor = {
        ...HSVaColor(...[data.h, data.s, data.v, data.a]),
        type: color.type,
      };
      setColor(newColor);
    }
  };

  useEffect(() => {
    if (isVisible) {
      const container = containerRef.current;
      const pointer = pointerRef.current;

      window.setTimeout(() => {
        if (container && pointer) {
          if (sliderDirection === "horizontal") {
            let { y, height } = calcXYAlphaCursorPosition(
              sliderDirection,
              container.getBoundingClientRect(),
              color
            );
            const offsetHeight = Number(pointerRef.current?.offsetHeight);

            pointer.style.left = `calc(${(y / height) * 100}% - ${
              offsetHeight / 2
            }px)`;
          } else {
            let { x, width } = calcXYAlphaCursorPosition(
              sliderDirection,
              container.getBoundingClientRect(),
              color
            );

            pointer.style.top = `calc(${(x / width) * 100}%)`;
          }
        }
      }, 25);
    }
  }, [isVisible, color, sliderDirection]);

  return (
    <div className="relative w-7 h-28 pl-1.5">
      <div
        className={`relative flex flex-col cursor-grab w-full h-full z-10 select-none ${style.cpAlphaWrapper} ${sliderDirectionCSS}`}
      >
        <Pointer
          pointerRef={pointerRef}
          pointerClassName="absolute w-6 h-1 border border-white select-none"
          pointerStyle={{
            top: pointerTop,
            left: pointerLeft,
            background: pointerBgColor,
          }}
          containerRef={containerRef}
          containerClassName="relative m-0 h-full box-border"
          handleChange={handleChange}
        ></Pointer>
      </div>
    </div>
  );
}

export default Alpha;
