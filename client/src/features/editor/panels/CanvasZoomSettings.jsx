import React, { useContext, useEffect } from 'react'
import ZoomInIcon from "@/assets/zoomIn.svg?react"
import ZoomOutIcon from "@/assets/zoomOut.svg?react"
import CanvasZoomContext from '../context/CanvasZoomContext'


export default function CanvasZoomSettings() {
  const {
    offset, setOffset,
    scale, setScale
  } = useContext(CanvasZoomContext)

  function clampScale(num) {
    const MAX_SCALE = 2.2
    const MIN_SCALE = 0.2
    return Math.min(MAX_SCALE, Math.max(num, MIN_SCALE));
  }

  const handleZoomIn = () => {
    setScale(prev => clampScale(Math.round((prev + 0.05) * 100) / 100))
  }

  const handleZoomOut = () => {
    setScale(prev => clampScale(Math.round((prev - 0.05) * 100) / 100))
  }

  const handleReset = () => {
    setScale(0.8)
    setOffset({x: 10, y: 10})
  }

  useEffect(() => {
    const canvasWrapper = document.getElementById("canvasWrapper")

    const handleWheel = (e) => {
      if (e.altKey) {
        const rect = canvasWrapper.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top

        const newScale = clampScale(scale - e.deltaY / 100 / 10)

        const scaleRatio = newScale / scale

        const newOffsetX = Math.round(mouseX - (mouseX - offset.x) * scaleRatio)
        const newOffsetY = Math.round(mouseY - (mouseY - offset.y) * scaleRatio)

        setOffset({
          x: newOffsetX,
          y: newOffsetY
        })
        setScale(newScale)
      }
    }

    if (canvasWrapper) {
      canvasWrapper.addEventListener('wheel', handleWheel)

      return () => {
        canvasWrapper.removeEventListener('wheel', handleWheel)
      }
    }
  }, [scale, offset])


  return (
    <div className="absolute bottom-6 right-6 z-10 bg-white shadow-black
                    p-2 px-3 rounded select-none
                    flex gap-3 items-center justify-between
                    [&>button]:p-1 [&>button]:rounded [&>button]:hover:bg-neutral-300
                    [&_svg]:fill-black">
      <button onClick={handleZoomIn}><ZoomInIcon /></button>
      <button onClick={handleZoomOut}><ZoomOutIcon /></button>
      <button onClick={handleReset}>Reset</button>
      <div className="w-px bg-black h-6"></div>
      <div className="flex-1 text-end">{`${Math.round(scale * 100)}%`}</div>
    </div>
  )
}
