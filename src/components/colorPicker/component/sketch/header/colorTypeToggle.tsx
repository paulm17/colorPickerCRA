import { useContext } from "react"
import { CPContext } from "../../../Context"

function ColorTypeToggle() {
  const { showGradient, setShowGradient } = useContext(CPContext)
  const btnActiveClass = "bg-blue-500 hover:bg-blue-800"
  const btnClass = "bg-gray-500 hover:bg-gray-800"
  const btnSolidCSS = !showGradient ? btnActiveClass : btnClass
  const btnGradientCSS = showGradient ? btnActiveClass : btnClass
  const gradientText = !showGradient ? "None" : "Gradient"
  const onColorType = (type: boolean) => {
    setShowGradient(type)
  }

  return (
    <>
      {showGradient && (
        <div className="w-full text-center">
          <button className={`${btnSolidCSS} w-3/6`} onClick={() => onColorType(false)}>
            Solid
          </button>
          <button className={`${btnGradientCSS} w-3/6`} onClick={() => onColorType(true)}>
            {gradientText}
          </button>
        </div>
      )}
    </>
  )
}

export default ColorTypeToggle
