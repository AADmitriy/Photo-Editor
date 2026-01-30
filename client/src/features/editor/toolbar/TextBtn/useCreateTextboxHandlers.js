import { Textbox } from "fabric";
import { useEffect, useState } from "react";



export default function useCreateTextboxHandlers(canvasEditor, activeToolId) {
  const [startPos, setStartPos] = useState({x: 0, y: 0})
  const [shape, setShape] = useState(null)


  const onMouseDown = (event) => {
    const timestamp = new Date().getTime()
    const id = `textbox_${timestamp}`

    const pointer = canvasEditor.getViewportPoint(event.e);
    setStartPos({ x: pointer.x, y: pointer.y });
    const newTextbox = new Textbox("Enter text here...", {
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'top',
      width: 0,
      height: 0,
      fontSize: 20,
      fill: "#000000",
      lockScalingFlip: true,
      lockScalingX: false,
      lockScalingY: false,
      editable: true,
      fontFamily: "OpenSans",
      textAlign: "left",
      id
    });
    canvasEditor.add(newTextbox);
    setShape(newTextbox);
  }

  const onMouseMove = (event) => {
    if (shape) {
      const pointer = canvasEditor.getViewportPoint(event.e);
      shape.set({
        width: Math.abs(startPos.x - pointer.x),
        height: Math.abs(startPos.y - pointer.y),
      });
      if (startPos.x > pointer.x) {
        shape.set({ left: pointer.x });
      }
      if (startPos.y > pointer.y) {
        shape.set({ top: pointer.y });
      }
      canvasEditor.renderAll();
    }
  }

  const onMouseUp = (e) => {
    if (shape) {
      const offsetX = shape.width / 2 + shape.left
      const offsetY = shape.height / 2 + shape.top
      shape.set({
        originX: 'center',
        originY: 'center',
        left: offsetX,
        top: offsetY,
      })
    }
    setShape(null);
  }

  useEffect(() => {
    if (canvasEditor) {
      const canNotCreateShape = () => {
        return activeToolId !== "text" ||
               canvasEditor.isObjectBeingModified ||
               canvasEditor.isDrawingMode
      }

      const handleMouseDown = (e) => {
        if (canNotCreateShape()) return;

        onMouseDown(e)
      }

      const handleMouseMove = (e) => {
        if (canNotCreateShape()) return;

        onMouseMove(e)
      }

      const handleMouseUp = (e) => {
        if (canNotCreateShape()) return;

        onMouseUp(e)
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
    }
  }, [canvasEditor, activeToolId, startPos, shape])
}