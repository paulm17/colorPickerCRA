import {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import { CPContext } from "../Context";
import Header from "./sketch/header";
import Body from "./sketch/body";
import Footer from "./sketch/footer";
import Portal from "./portal";
import { SketchProps, DropDownCoords } from "./types";
//import style from "./style.module.css"

function Sketch(props: SketchProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const { isVisible, zIndex } = useContext(CPContext);
  const sketchRef = useRef<HTMLDivElement | null>(null);

  const calcDropDownView = useCallback(() => {
    const dropDownRect = props.dropDownRef.current?.getBoundingClientRect();
    const sketchRect = sketchRef.current?.getBoundingClientRect();

    if (sketchRect && dropDownRect) {
      let sideBarDiv = document.getElementById("sideBarTabs") as HTMLDivElement;
      const scrollTop = sideBarDiv.scrollTop;
      let winHeight = window.innerHeight;
      let uiPosY = Number(dropDownRect.top) + scrollTop;
      let uiHeight = sketchRect.height;

      let fitsDown = uiPosY + uiHeight <= scrollTop + winHeight;
      let fitsAbove = uiPosY > scrollTop;

      // If it does not fit below, only render it
      // above it fit's there.
      // It's acceptable that the user needs to
      // scroll the viewport to see the cut off UI
      let renderAbove = !fitsDown && fitsAbove;

      if (renderAbove) {
        return true;
      }

      return false;
    }
  }, [props.dropDownRef]);

  const inlineStyle = useMemo(() => {
    let inlineStyle: DropDownCoords = {} as DropDownCoords;
    const dropDownRect = props.dropDownRef.current?.getBoundingClientRect();
    const sketchRect = sketchRef.current?.getBoundingClientRect();

    if (calcDropDownView()) {
      inlineStyle.top = Number(dropDownRect?.top) - Number(sketchRect?.height);
    } else {
      inlineStyle.top =
        Number(dropDownRect?.top) + Number(dropDownRect?.height) + scrollTop;
    }

    inlineStyle.left = isVisible ? Number(dropDownRect?.left) : -5000;

    return inlineStyle;
  }, [isVisible, scrollTop, calcDropDownView, props.dropDownRef]);

  useEffect(() => {
    const div = document.querySelector("#sideBarTabs") as HTMLDivElement;
    const callback = () => {
      if (isVisible) {
        setScrollTop(div.scrollTop);
      }
    };
    div.addEventListener("scroll", callback, { passive: true });
    return () => {
      div.removeEventListener("scroll", callback);
    };
  }, [isVisible]);

  console.log("sketch being rebuilt");

  return (
    <Portal>
      <div
        ref={sketchRef}
        className={`z-${zIndex} ${
          isVisible ? `opacity-100` : `opacity-0`
        }  block absolute w-${
          props.width
        } bg-white borer-r-4 shadow-md box-border hover:shadow-lg`}
        style={inlineStyle}
      >
        <Header></Header>
        <Body></Body>
        <Footer {...props}></Footer>
      </div>
    </Portal>
  );
}

export default memo(Sketch);
