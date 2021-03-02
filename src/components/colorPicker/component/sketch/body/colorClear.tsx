import { useContext } from "react"
import { CPContext } from "../../../Context"
import { HSVaColor } from "../../utils/hsvacolor.js"
import style from "../../style.module.css"

function ColorClear() {
  const { color, setColor } = useContext(CPContext)

  const onClearColor = () => {
    let data = {
      h: 0,
      s: 0,
      v: 0,
      a: 0,
    }

    const newColor = { ...HSVaColor(...[data.h, data.s, data.v, data.a]), type: color.type }
    setColor(newColor)
  }

  return (
    <div
      className={`bg-no-repeat bg-center border border-gray-500 h-7 w-11/12 ml-1.5 mb-1 cursor-pointer ${style.cpColorClearBg}`}
      onClick={() => onClearColor()}
    ></div>
  )
}

export default ColorClear
