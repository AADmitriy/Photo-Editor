import React, { useContext, useState } from 'react'
import RectIcon from '@/assets/rectangle.svg?react'
import CircleIcon from '@/assets/circle.svg?react'
import TriangleIcon from '@/assets/triangle.svg?react'
import LineIcon from '@/assets/line.svg?react'
import CanvasContext from '../../context/CanvasContext'
import useDrawingHandlers from './hooks/useDrawingHandlers'


export default function ShapeBtn({activeMenuId, setActiveMenuId, activeToolId, setActiveToolId}) {
  const shapeToolId = "shape"
  const shapeMenuId = "ShapeMenu"
  const isMenuOpen = activeMenuId === shapeMenuId
  const {canvasEditor} = useContext(CanvasContext)
  const [currentShape, setCurrentShape] = useState("rect")

  useDrawingHandlers(canvasEditor, currentShape, activeToolId)


  const choseCurrentShape = (shape) => {
    setCurrentShape(shape)
    canvasEditor.defaultCursor = "crosshair";
    canvasEditor.isDrawingMode = false;
  }

  const handleChoseShapeBtn = (shape) => {
    choseCurrentShape(shape); 
    setActiveMenuId(null)
  }

  const handleShapeBtnClick = () => {
    choseCurrentShape(currentShape); 
    setActiveMenuId(shapeMenuId);
    setActiveToolId(shapeToolId)
  }

  return (
    <div className="relative">
      <button className={`toolbar-btn 
                          ${activeToolId === shapeToolId ? "bg-blue-400/50! hover:bg-blue-500/50!" : ""}`}
              onClick={handleShapeBtnClick}>
        {currentShape === "rect" && <RectIcon />}
        {currentShape === "circle" && <CircleIcon />}
        {currentShape === "triangle" && <TriangleIcon />}
        {currentShape === "line" && <LineIcon />}
      </button>
      { isMenuOpen && activeToolId === shapeToolId &&
      <div className="absolute top-0 -right-24
                      flex flex-col bg-white text-sm font-thin
                      [&_button]:flex [&_button]:items-center [&_button]:gap-2
                      [&_button]:px-0.5 [&_button]:hover:bg-neutral-200
                      [&_svg]:w-5 [&_svg]:fill-neutral-500">
        <button onClick={() => {handleChoseShapeBtn("rect")}}>
          <RectIcon /> Rectangle
        </button>
        <button onClick={() => {handleChoseShapeBtn("circle")}}>
          <CircleIcon /> Circle
        </button>
        <button onClick={() => {handleChoseShapeBtn("triangle")}}>
          <TriangleIcon /> Triangle
        </button>
        <button onClick={() => {handleChoseShapeBtn("line")}}>
          <LineIcon /> Line
        </button>
      </div>
      }
    </div>
  )
}
