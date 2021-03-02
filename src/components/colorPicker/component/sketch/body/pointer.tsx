import { RefObject } from "react"

interface pointerProps {
  pointerRef: RefObject<HTMLDivElement>
  pointerStyle: {
    top: string | undefined
    left: string | undefined
    background: string | undefined
  }
  pointerClassName?: string
  containerRef: RefObject<HTMLDivElement>
  containerClassName?: string
  containerBackground?: { background: string | undefined }
  handleChange: (evt: any) => void
}

function Pointer(props: pointerProps) {
  const handleMouseUp = () => {
    props.pointerRef.current?.removeEventListener("mousemove", props.handleChange)
    props.pointerRef.current?.removeEventListener("mouseup", props.handleChange)
    props.pointerRef.current?.removeEventListener("mouseup", handleMouseUp)

    props.containerRef.current?.removeEventListener("mousemove", props.handleChange)
    props.containerRef.current?.removeEventListener("mouseup", props.handleChange)
    props.containerRef.current?.removeEventListener("mouseup", handleMouseUp)
  }

  const handleMouseDown = () => {
    props.pointerRef.current?.addEventListener("mousemove", props.handleChange)
    props.pointerRef.current?.addEventListener("mouseup", props.handleChange)
    props.pointerRef.current?.addEventListener("mouseup", handleMouseUp)

    props.containerRef.current?.addEventListener("mousemove", props.handleChange)
    props.containerRef.current?.addEventListener("mouseup", props.handleChange)
    props.containerRef.current?.addEventListener("mouseup", handleMouseUp)
  }

  return (
    <>
      <div
        ref={props.pointerRef}
        className={props.pointerClassName}
        onMouseDown={handleMouseDown}
        onTouchStart={props.handleChange}
        onTouchMove={props.handleChange}
        style={props.pointerStyle}
      ></div>
      <div
        ref={props.containerRef}
        className={props.containerClassName}
        onMouseDown={handleMouseDown}
        onTouchStart={props.handleChange}
        onTouchMove={props.handleChange}
        style={props.containerBackground}
      ></div>
    </>
  )
}

export default Pointer
