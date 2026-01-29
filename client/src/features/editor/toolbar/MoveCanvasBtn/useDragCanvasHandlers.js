import { useContext, useEffect, useRef } from "react"
import CanvasZoomContext from "../../context/CanvasZoomContext"


export default function useDragCanvasHandlers(canvasEditor, activeToolId) {
  const startPos = useRef({x: 0, y: 0})
  const {setOffset} = useContext(CanvasZoomContext)

  const mouseDown = (e) => {
    startPos.current = {
      x: e.clientX,
      y: e.clientY
    }
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
  }

  const mouseMove = (e) => {
    const newX = startPos.current.x - e.clientX
    const newY = startPos.current.y - e.clientY

    startPos.current = {
      x: e.clientX,
      y: e.clientY
    }

    setOffset(prev => ({
      x: prev.x - newX,
      y: prev.y - newY
    }))
  }

  const mouseUp = (e) => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
  }


  useEffect(() => {
    if (canvasEditor) {
      const canvasElement = document.getElementById("canvas")
      const canvasWrapper = document.getElementById("canvasWrapper")

      const handleMouseDown = (e) => {
        if (activeToolId === "moveCanvas" 
            && !canvasEditor.isDrawingMode) {
          mouseDown(e)
        }
      }

      if (canvasElement && canvasWrapper) {

        const windowScroll = (e) => {
          if (e.altKey) return;

          if (e.ctrlKey) {
            e.preventDefault()
            setOffset(prev => ({
              x: prev.x - e.deltaY / 2,
              y: prev.y - e.deltaX / 2
            }))
            return
          }
          setOffset(prev => ({
            x: prev.x - e.deltaX / 2,
            y: prev.y - e.deltaY / 2
          }))
        }
        canvasWrapper.addEventListener("wheel", windowScroll, {passive: false});

        canvasElement.addEventListener('mousedown', handleMouseDown)

        return () => {
          canvasElement.removeEventListener('mousedown', handleMouseDown)
          canvasWrapper.removeEventListener("wheel", windowScroll);
        }
      }
    }
  }, [canvasEditor, activeToolId])
}