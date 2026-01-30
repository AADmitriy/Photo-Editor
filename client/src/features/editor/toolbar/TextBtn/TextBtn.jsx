import React, { useContext } from 'react'
import CanvasContext from '../../context/CanvasContext'
// import { Textbox } from 'fabric'
import LetterTIcon from "@/assets/letterT.svg?react"
import useCreateTextboxHandlers from './useCreateTextboxHandlers'

export default function TextBtn({activeToolId, setActiveToolId}) {
  const {canvasEditor} = useContext(CanvasContext)

  // const addTextToCanvas = () => {
  //   if (canvasEditor) {
  //     const textbox = new Textbox("Enter text here...", {
  //       width: 100,
  //       height: 100,
  //       top: 50,
  //       left: 50,
  //       fontSize: 20,
  //       fill: "#000000",
  //       lockScalingFlip: true,
  //       lockScalingX: false,
  //       lockScalingY: false,
  //       editable: true,
  //       fontFamily: "OpenSans",
  //       textAlign: "left",
  //     })
  //     canvasEditor.add(textbox)
  //   }
  // }

  useCreateTextboxHandlers(canvasEditor, activeToolId)

  const handleTextBtnClick = (e) => {
    canvasEditor.defaultCursor = "crosshair";
    canvasEditor.isDrawingMode = false;
    setActiveToolId("text")
    // addTextToCanvas()
  }


  return (
    <button className={`toolbar-btn 
                      ${activeToolId === "text" ? "bg-blue-400/50! hover:bg-blue-500/50!" : ""}`}
            onClick={handleTextBtnClick}>
      <LetterTIcon />
    </button>
  )
}
