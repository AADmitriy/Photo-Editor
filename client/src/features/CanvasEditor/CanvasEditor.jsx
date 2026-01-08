import React, { useContext, useEffect, useRef, useState } from 'react'
import { Canvas } from "fabric"
import CanvasContext from '@/features/CanvasEditor/context'
import useBackspaceDelete from './hooks/useBackspaceDelete'

export default function CanvasEditor() {
  const wrapperRef = useRef()
  const canvasRef = useRef()
  const [canvas, setCanvas] = useState(null)
  const {canvasEditor, setCanvasEditor} = useContext(CanvasContext)


  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        backgroundColor: "#eeeeee"
      })

      const resizeCanvas = () => {
        const { clientWidth, clientHeight } = wrapperRef.current;
        
        console.log("set canvas to ", clientHeight, clientHeight)
        initCanvas.set({
          width: clientWidth,
          height: clientHeight
        })
        // initCanvas.setWidth(clientWidth);
        // initCanvas.setHeight(clientHeight);
        initCanvas.renderAll();
      };
  
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
  
      setCanvas(initCanvas)
      setCanvasEditor(initCanvas)

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        initCanvas.dispose()
      }
    }
  }, [])

  useBackspaceDelete(canvasEditor)

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  )
}
