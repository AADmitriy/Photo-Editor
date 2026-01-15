import React, { useContext } from 'react'
import CursorIcon from '@/assets/cursor.svg?react'
import CanvasContext from '../context/CanvasContext'

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
