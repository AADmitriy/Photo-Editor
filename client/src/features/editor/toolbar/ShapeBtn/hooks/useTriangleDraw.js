import { Triangle } from "fabric";
import { useState } from "react";


export default function useTriangleDraw(canvasEditor, startPosState, shapeState) {
  const {startPos, setStartPos} = startPosState
  const {shape, setShape} = shapeState


  const onMouseDown = (event) => {
    const timestamp = new Date().getTime()
    const id = `triangle_${timestamp}`

    const pointer = canvasEditor.getViewportPoint(event.e);
    setStartPos({ x: pointer.x, y: pointer.y });
    const newTriangle = new Triangle({
      left: pointer.x,
      top: pointer.y,
      width: 0,
      height: 0,
      fill: "#31F7AA",
      stroke: 'black',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      id,
    });
    canvasEditor.add(newTriangle);
    setShape(newTriangle);
  };
  
  const onMouseMove = (event) => {
    if (shape) {
      const pointer = canvasEditor.getViewportPoint(event.e);
      const width = Math.abs(pointer.x - startPos.x);
      const height = Math.abs(pointer.y - startPos.y);
      shape.set({
        width,
        height,
        left: Math.min(pointer.x, startPos.x),
        top: Math.min(pointer.y, startPos.y),
      });
      canvasEditor.renderAll();
    }
  };
  
  const onMouseUp = () => {
    setShape(null);
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  }
}