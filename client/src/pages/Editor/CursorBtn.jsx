import React, { useContext } from 'react'
import CursorIcon from '@/assets/cursor.svg?react'
import CanvasContext from '@/features/CanvasEditor/context'

export default function CursorBtn() {
  const { canvasEditor } = useContext(CanvasContext)

  const resetCanvasCursor = () => {
    canvasEditor.isDrawingMode = false
  }
  return (
    <button onClick={resetCanvasCursor}>
      <CursorIcon />
    </button>
  )
}
