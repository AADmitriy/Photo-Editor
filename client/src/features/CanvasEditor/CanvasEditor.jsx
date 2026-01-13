import React, { useContext, useEffect, useRef, useState } from 'react'
import { Canvas } from "fabric"
import CanvasContext from '@/features/CanvasEditor/context'
import useBackspaceDelete from './hooks/useBackspaceDelete'
import FabricHistory from './FabricHistory'
import CanvasHistoryContext from '@/features/CanvasEditor/context/CanvasHistoryContext'

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

      // initCanvas.undo = () => history.undo()
      // initCanvas.redo = () => history.redo()

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
