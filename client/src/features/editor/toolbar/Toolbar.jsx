import React, { useState } from 'react'
import BrushBtn from './BrushBtn'
import CursorBtn from './CursorBtn'
import RedoBtn from './RedoBtn'
import SelectImageBtn from './SelectImageBtn'
import ShapeBtn from './ShapeBtn'
import UndoBtn from './UndoBtn'

export default function Toolbar() {
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [activeToolId, setActiveToolId] = useState("cursor")
  return (
    <div className="absolute z-10 left-6 top-3/12 p-1 rounded flex flex-col gap-1 bg-neutral-300/50
                  [&_svg]:fill-black">
      <SelectImageBtn />
      <CursorBtn 
        activeToolId={activeToolId}
        setActiveToolId={setActiveToolId}
      />
      <BrushBtn
        activeToolId={activeToolId}
        setActiveToolId={setActiveToolId}
      />
      <UndoBtn />
      <RedoBtn />
      <ShapeBtn
        activeMenuId={activeMenuId}
        setActiveMenuId={setActiveMenuId}
        activeToolId={activeToolId}
        setActiveToolId={setActiveToolId}
      />
    </div>
  )
}
