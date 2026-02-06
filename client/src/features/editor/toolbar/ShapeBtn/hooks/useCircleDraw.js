import { Circle } from "fabric"

export default function useDrawCircle(canvasEditor, startPosState, shapeState) {
  const { startPos, setStartPos } = startPosState
  const { shape, setShape } = shapeState

  const onMouseDown = (event) => {
    const timestamp = new Date().getTime()
    const id = `circle_${timestamp}`

    // console.log(canvasEditor.getScenePoint(event.e));
    const pointer = canvasEditor.getViewportPoint(event.e);
    setStartPos({ x: pointer.x, y: pointer.y });
    const newCircle = new Circle({
      left: pointer.x,
      top: pointer.y,
      originX: 'center',
      originY: 'center',
      radius: 0,
      fill: "#2F4DC6",
      stroke: '#000000',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      id,
    });
    
    canvasEditor.add(newCircle);
    setShape(newCircle);
  };
  
  const onMouseMove = (event) => {
    if (shape) {
      const pointer = canvasEditor.getViewportPoint(event.e);
      const radius = Math.hypot(pointer.x - startPos.x, pointer.y - startPos.y);
      shape.set({ radius });
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