import { useState, useEffect } from "react";
import useDrawCircle from "./useCircleDraw";
import useDrawRect from "./useRectDraw";
import useTriangleDraw from "./useTriangleDraw";
import useLineDraw from "./useLineDraw"


export default function useDrawingHandlers(canvasEditor, currentShape, activeToolId) {
  const [startPos, setStartPos] = useState({x: 0, y: 0})
  const [shape, setShape] = useState(null)


  const drawRect = useDrawRect(
    canvasEditor,
    {startPos, setStartPos},
    {shape, setShape}
  )

  const drawCircle = useDrawCircle(
    canvasEditor,
    {startPos, setStartPos},
    {shape, setShape}
  )

  const drawTriangle = useTriangleDraw(
    canvasEditor,
    {startPos, setStartPos},
    {shape, setShape}
  )

  const drawLine = useLineDraw(
    canvasEditor,
    {shape, setShape}
  )

  useEffect(() => {
    if (!canvasEditor) return

    const canNotCreateShape = () => {
      return activeToolId !== "shape" ||
             canvasEditor.isObjectBeingModified ||
             canvasEditor.isDrawingMode
    }

    const handleMouseDown = (event) => {
      if (canNotCreateShape()) return

      switch (currentShape) {
        case 'rect':
          drawRect.onMouseDown(event)
          break;
        case 'circle':
          drawCircle.onMouseDown(event)
          break;
        case 'triangle':
          drawTriangle.onMouseDown(event)
          break;
        case 'line':
          drawLine.onMouseDown(event)
        default:
          break;
      }
    }

    const handleMouseMove = (event) => {
      if (canNotCreateShape()) return

      switch (currentShape) {
        case 'rect':
          drawRect.onMouseMove(event)
          break;
        case 'circle':
          drawCircle.onMouseMove(event)
          break;
        case 'triangle':
          drawTriangle.onMouseMove(event)
          break;
        case 'line':
          drawLine.onMouseMove(event)
        default:
          break;
      }
    }

    const handleMouseUp = () => {
      if (canNotCreateShape()) return

      switch (currentShape) {
        case 'rect':
          drawRect.onMouseUp()
          break;
        case 'circle':
          drawCircle.onMouseUp()
          break;
        case 'triangle':
          drawTriangle.onMouseUp()
          break;
        case 'line':
          drawLine.onMouseUp()
        default:
          break;
      }
    }

    canvasEditor.on('mouse:down', handleMouseDown)
    canvasEditor.on('mouse:move', handleMouseMove)
    canvasEditor.on('mouse:up', handleMouseUp)

    return () => {
      if (canvasEditor) {
        canvasEditor.off('mouse:down', handleMouseDown)
        canvasEditor.off('mouse:move', handleMouseMove)
        canvasEditor.off('mouse:up', handleMouseUp)
      }
    }

  }, [currentShape, canvasEditor, activeToolId, shape, startPos])
}