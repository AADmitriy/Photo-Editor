import React, { useContext, useEffect, useRef, useState } from 'react'
import { Canvas, FabricObject } from "fabric"
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts'
import CanvasContext from '../context/CanvasContext'
import FabricHistory from './FabricHistory'
import CanvasHistoryContext from '../context/CanvasHistoryContext'
import CanvasZoomWrapper from './CanvasZoomWrapper'

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

      initCanvas.on("before:transform", () => {
        initCanvas.isObjectBeingModified = true;
      });
    
      initCanvas.on("object:modified", () => {
        initCanvas.isObjectBeingModified = false;
      });

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

  
      setCanvas(initCanvas)
      setCanvasEditor(initCanvas)

      return () => {
        initCanvas.dispose()
      }
    }
  }, [])

  useKeyboardShortcuts(canvasEditor, undo, redo)

  return (
    <CanvasZoomWrapper>
      <div ref={wrapperRef} id="canvas" className="w-full h-full">
        <canvas id="canvas" ref={canvasRef}></canvas>
      </div>
    </CanvasZoomWrapper>
  )
}
