import React from 'react'
import BrushBtn from './BrushBtn'
import CursorBtn from './CursorBtn'
import RedoBtn from './RedoBtn'
import SelectImageBtn from './SelectImageBtn'
import UndoBtn from './UndoBtn'

export default function Toolbar() {
  return (
    <div className="absolute z-10 left-6 top-3/12 p-1 rounded flex flex-col gap-1 bg-neutral-300/50
                    [&>*]:px-2 [&>*]:py-2 [&>*]:hover:bg-neutral-400/25 [&>*]:w-min
                    [&>*]:disabled:opacity-50
                  [&_svg]:fill-black">
      <SelectImageBtn />
      <CursorBtn />
      <BrushBtn />
      <UndoBtn />
      <RedoBtn />
    </div>
  )
}
