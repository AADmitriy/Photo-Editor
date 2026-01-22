import React, { useContext } from 'react'
import CursorIcon from '@/assets/cursor.svg?react'
import CanvasContext from '../context/CanvasContext'

export default function CursorBtn({activeToolId, setActiveToolId}) {
  const { canvasEditor } = useContext(CanvasContext)

  const resetCanvasCursor = () => {
    canvasEditor.defaultCursor = "default"
    canvasEditor.isDrawingMode = false
    setActiveToolId("cursor")
  }
  return (
    <button className={`toolbar-btn 
                      ${activeToolId === "cursor" ? "bg-blue-400/50! hover:bg-blue-500/50!" : ""}`}
            onClick={resetCanvasCursor}>
      <CursorIcon />
    </button>
  )
}
