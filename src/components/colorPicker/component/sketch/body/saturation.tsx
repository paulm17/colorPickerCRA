import { useContext, useEffect, useMemo, useRef, memo } from "react";
import { CPContext } from "../../../Context";
import Pointer from "./pointer";
import { HSVaColor } from "../../utils/hsvacolor.js";
import { calcXY, calcXYSaturationCursorPosition } from "../../utils/cursor.js";
import { clamp } from "../../utils/clamp";
import style from "../../style.module.css";

function Saturation() {
  const pointerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, color, setColor } = useContext(CPContext);
  const containerBackground = useMemo(() => {
    if (Object.entries(color).length === 0) {
      return "transparent";
    }

    const bg = `linear-gradient(to top, rgba(0, 0, 0, 1), transparent), linear-gradient(to left, hsla(${color.h}, 100%, 50%, 1), rgba(255, 255, 255, 1))`.trim();
    return bg;
  }, [color]);

  const pointerBgColor = useMemo(() => {
    if (Object.entries(color).length === 0) {
      return "transparent";
    }

    return color.toRGBA().toString();
  }, [color]);

  const pointerTop = useMemo(() => {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const { y, height } = calcXYSaturationCursorPosition(
        containerRect,
        color
      );
      const offsetHeight = Number(pointerRef.current?.offsetHeight);

      return `calc(${(y / height) * 100}% - ${offsetHeight / 2}px)`;
    }
  }, [color]);

  const pointerLeft = useMemo(() => {
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const { x, width } = calcXYSaturationCursorPosition(containerRect, color);
      const offsetWidth = Number(pointerRef.current?.offsetWidth);

      return `calc(${(x / width) * 100}% - ${offsetWidth / 2}px)`;
    }
  }, [color]);

  const handleChange = (evt: any) => {
    let ex = 0,
      ey = 0;
    if (evt) {
      const touch = evt && evt.touches && evt.touches[0];
      ex = evt ? (touch || evt).clientX : 0;
      ey = evt ? (touch || evt).clientY : 0;
    }

    const rect = containerRef.current?.getBoundingClientRect();

    if (rect) {
      let { x, y } = calcXY(rect, ex, ey);
      const cx = clamp(x / rect.width);
      const cy = clamp(y / rect.height);
      let saturation = cx * 100;
      let brightness = 100 - cy * 100;
      let data = {
        h: color.h,
        s: saturation,
        v: brightness < 0 ? 0 : brightness,
        a: color.a,
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
      console.log("saturation being re-rendered");
      const container = containerRef.current;
      const pointer = pointerRef.current;

      window.setTimeout(() => {
        if (container && pointer) {
          const { x, y, width, height } = calcXYSaturationCursorPosition(
            container.getBoundingClientRect(),
            color
          );

          const offsetWidth = Number(pointerRef.current?.offsetWidth);
          const offsetHeight = Number(pointerRef.current?.offsetHeight);

          pointer.style.left = `calc(${(x / width) * 100}% - ${
            offsetWidth / 2
          }px)`;
          pointer.style.top = `calc(${(y / height) * 100}% - ${
            offsetHeight / 2
          }px)`;
        }
      }, 25);
    }
  }, [isVisible, color]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`cursor-grab w-full h-full z-10 ${style.cpSaturationWrapper}`}
      >
        <Pointer
          pointerRef={pointerRef}
          pointerClassName="absolute h-4 w-4 border border-white  rounded-full select-none"
          pointerStyle={{
            top: pointerTop,
            left: pointerLeft,
            background: pointerBgColor,
          }}
          containerRef={containerRef}
          containerClassName={`w-full h-full ${style.cpChessboard}`}
          containerBackground={{ background: containerBackground }}
          handleChange={handleChange}
        ></Pointer>
      </div>
    </div>
  );
}

export default memo(Saturation);
