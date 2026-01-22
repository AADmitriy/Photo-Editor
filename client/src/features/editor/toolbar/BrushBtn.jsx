import React, { useContext } from 'react'
import BrushIcon from "@/assets/brush.svg?react"
import CanvasContext from '../context/CanvasContext'
import { PencilBrush } from 'fabric'

export default function BrushBtn({activeToolId, setActiveToolId}) {
  const { canvasEditor } = useContext(CanvasContext)

  const addBrushToCanvas = () => {
    canvasEditor.defaultCursor = "pointer"
    canvasEditor.isDrawingMode = true
    canvasEditor.freeDrawingBrush = new PencilBrush(canvasEditor)
    setActiveToolId("brush")
  }

  return (
    <button className={`toolbar-btn 
                      ${activeToolId === "brush" ? "bg-blue-400/50! hover:bg-blue-500/50!" : ""}`}
            onClick={addBrushToCanvas}>
      <BrushIcon />
    </button>
  )
}
