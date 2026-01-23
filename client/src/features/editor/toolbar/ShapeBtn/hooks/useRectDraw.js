import { Rect } from "fabric";


export default function useDrawRect(canvasEditor, startPosState, shapeState) {
  const {startPos, setStartPos} = startPosState
  const {shape, setShape} = shapeState


  const onMouseDown = (event) => {
    const timestamp = new Date().getTime()
    const id = `rect_${timestamp}`

    const pointer = canvasEditor.getViewportPoint(event.e);
    setStartPos({ x: pointer.x, y: pointer.y });
    const newRectangle = new Rect({
      left: pointer.x,
      top: pointer.y,
      originX: 'left',
      originY: 'top',
      width: 0,
      height: 0,
      fill: "#ff0000",
      stroke: 'black',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      id,
    });
    canvasEditor.add(newRectangle);
    setShape(newRectangle);
  };
  
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
  };
  
  const onMouseUp = () => {
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
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp
  }
}