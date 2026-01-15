import React, { useContext, useEffect, useRef, useState } from 'react'
import { Canvas, FabricObject } from "fabric"
import useBackspaceDelete from './hooks/useBackspaceDelete'
import CanvasContext from '../context/CanvasContext'
import FabricHistory from './FabricHistory'
import CanvasHistoryContext from '../context/CanvasHistoryContext'

export default function CanvasEditor() {
  const wrapperRef = useRef()
  const canvasRef = useRef()
  const [canvas, setCanvas] = useState(null)
  const {canvasEditor, setCanvasEditor} = useContext(CanvasContext)
  const {
    canUndo, setCanUndo,
    canRedo, setCanRedo,
    undo,
    redo,
    setUndoRedo
  } = useContext(CanvasHistoryContext)


  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        backgroundColor: "#eeeeee"
      })

      const onHistoryChange = ({canUndo, canRedo}) => {
        setCanUndo(canUndo)
        setCanRedo(canRedo)
      }

      FabricObject.customProperties = ['id', 'zIndex'];
      
      const history = new FabricHistory(initCanvas, onHistoryChange)

      let timeout = null
      const saveState = () => {
        if (history.isRestoring) return;

        clearTimeout(timeout)
        timeout =  setTimeout(() => {history.save()}, 100)
      }

      initCanvas.on("object:added", () => {saveState()})
      initCanvas.on("object:modified", () => {saveState()})
      initCanvas.on("object:removed", () => {saveState()})
      initCanvas.on("path:created", () => {saveState()})

      setUndoRedo({
        undo: () => history.undo(),
        redo: () => history.redo()
      })

      const resizeCanvas = () => {
        const { clientWidth, clientHeight } = wrapperRef.current;
        
        console.log("set canvas to ", clientHeight, clientHeight)
        initCanvas.set({
          width: clientWidth,
          height: clientHeight
        })
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
