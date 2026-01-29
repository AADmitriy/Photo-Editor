import React, { useContext } from 'react'
import CanvasZoomContext from '../context/CanvasZoomContext'

export default function CanvasZoomWrapper({children}) {
  const {offset, scale} = useContext(CanvasZoomContext)

  return (
    <div id="canvasWrapper" className="w-full h-full cubic-background">
      <div style={{"transform": `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                   "transformOrigin": "0 0"}}>
        {children}
      </div>
    </div>
  )
}
