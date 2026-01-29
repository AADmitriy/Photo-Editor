import React, { useContext } from 'react'
import CanvasContext from '../../context/CanvasContext'
import HandIcon from '@/assets/hand.svg?react'
import useDragCanvasHandlers from './useDragCanvasHandlers'

export default function MoveCanvasBtn({activeToolId, setActiveToolId}) {
  const { canvasEditor } = useContext(CanvasContext)

  useDragCanvasHandlers(canvasEditor, activeToolId)

  const resetCanvasCursor = () => {
    canvasEditor.defaultCursor = "move"
    canvasEditor.isDrawingMode = false
    setActiveToolId("moveCanvas")
  }
  return (
    <button className={`toolbar-btn 
                      ${activeToolId === "moveCanvas" ? "bg-blue-400/50! hover:bg-blue-500/50!" : ""}`}
            onClick={resetCanvasCursor}>
      <HandIcon />
    </button>
  )
}
