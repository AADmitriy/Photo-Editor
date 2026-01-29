import Input from '@/components/ui/Input'
import React, { useContext, useEffect, useState } from 'react'
import CanvasContext from '../context/CanvasContext'

export default function CanvasSettings() {
  const [canvasWidth, setCanvasWidth] = useState(500)
  const [canvasHeight, setCanvasHeight] = useState(450)
  const {canvasEditor} = useContext(CanvasContext)

  useEffect(() => {
    if (canvasEditor) {
      // canvasEditor.set({
      //   width: canvasWidth,
      //   height: canvasHeight
      // })
      canvasEditor.setDimensions({
        width: canvasWidth,
        height: canvasHeight
      })
      canvasEditor.renderAll()
    }
  }, [canvasWidth, canvasHeight, canvasEditor])

  const handleWidthChange = (e) => {
    const value = e.target.value.replace(/,/g, "")
    const intValue = parseInt(value, 10) || 1

    if (intValue >= 0) {
      setCanvasWidth(intValue)
    }
  }

  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/,/g, "")
    const intValue = parseInt(value, 10) || 1

    if (intValue >= 0) {
      setCanvasHeight(intValue)
    }
  }

  return (
    <div className="px-1 pb-2.5 pt-1.5 rounded flex flex-col gap-2 bg-neutral-300 min-w-34 text-sm">
      <Input 
        label="Canvas Width"
        value={canvasWidth}
        onChange={handleWidthChange}
      />
      <Input 
        label="Canvas Height"
        value={canvasHeight}
        onChange={handleHeightChange}
      />
    </div>
  )
}
