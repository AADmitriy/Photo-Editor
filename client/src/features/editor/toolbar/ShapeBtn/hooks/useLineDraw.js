import { Line } from "fabric";


export default function useLineDraw(canvasEditor, shapeState) {
  const {shape, setShape} = shapeState


  const onMouseDown = (event) => {
    const timestamp = new Date().getTime()
    const id = `line_${timestamp}`

    const pointer = canvasEditor.getViewportPoint(event.e);
    const newLine = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      stroke: '#000000',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      id,
    });
    canvasEditor.add(newLine);
    setShape(newLine);
  };
  
  const onMouseMove = (event) => {
    if (shape) {
      const pointer = canvasEditor.getViewportPoint(event.e);
      shape.set({ x2: pointer.x, y2: pointer.y });
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