import { useContext } from "react"
import { CPContext } from "../../../Context"
import { parseToHSVA } from "../../utils/color.js"
import { HSVaColor } from "../../utils/hsvacolor.js"
import style from "../../style.module.css"

function ColorPresets() {
  const { showPresets, setColor } = useContext(CPContext)
  const presetColors = [
    "#D0021B",
    "#F5A623",
    "#F8E71C",
    "#8B572A",
    "#7ED321",
    "#417505",
    "#BD10E0",
    "#9013FE",
    "#4A90E2",
    "#50E3C2",
    "#B8E986",
    "#000000",
    "#4A4A4A",
    "#9B9B9B",
    "#FFFFFF",
    "rgba(0, 150, 136, 0.75)",
    "rgba(76, 175, 80, 0.8)",
    "rgba(139, 195, 74, 0.85)",
    "rgba(205, 220, 57, 0.9)",
    "rgba(255, 235, 59, 0.95)",
  ]

  const handlePreset = (c: string) => {
    const { values, type } = parseToHSVA(c)

    // If no opacity is applied, add undefined at the very end which gets
    // Set to 1 in setHSVA
    if (values && values.length === 3) {
      values[3] = undefined
    }

    let newColor = { ...HSVaColor(...values), type: type }
    setColor(newColor)
  }

  return (
    <>
      {showPresets && (
        <div className="flex flex-row flex-wrap mt-1">
          {presetColors.map((c, index) => {
            return (
              <div
                className={`relative overflow-hidden rounded-sm block align-top w-4 h-4 shadow-md cursor-pointer mr-1 mb-1 ${style.cpChessboard}`}
                key={index}
                style={{ background: c }}
                onClick={() => handlePreset(c)}
              ></div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ColorPresets
