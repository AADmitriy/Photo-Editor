import React, { useContext } from 'react'
import BrushIcon from "@/assets/brush.svg?react"
import CanvasContext from '../context/CanvasContext'
import { PencilBrush } from 'fabric'

export default function BrushBtn() {
  const { canvasEditor } = useContext(CanvasContext)

  const addBrushToCanvas = () => {
    canvasEditor.isDrawingMode = true
    canvasEditor.freeDrawingBrush = new PencilBrush(canvasEditor)
  }

  return (
    <button onClick={addBrushToCanvas}>
      <BrushIcon />
    </button>
  )
}
