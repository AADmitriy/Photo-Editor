import CanvasEditor from '@/features/CanvasEditor'
import CanvasContext from '@/features/CanvasEditor/context'
import { CanvasHistoryProvider } from '@/features/CanvasEditor/context/CanvasHistoryContext'
import BrushBtn from '@/pages/Editor/BrushBtn'
import CursorBtn from '@/pages/Editor/CursorBtn'
import RedoBtn from '@/pages/Editor/RedoBtn'
import SelectImageBtn from '@/pages/Editor/SelectImageBtn'
import UndoBtn from '@/pages/Editor/UndoBtn'
import React, { useState } from 'react'

export default function EditorPage() {
  const [canvasEditor, setCanvasEditor] = useState()
  return (
    <div className="h-screen flex flex-col">
      <CanvasContext.Provider value={{canvasEditor, setCanvasEditor}} >
        <CanvasHistoryProvider>
          <div className="h-14 font-thin mt-0">EditorPage</div>
          <div className="relative flex-1 flex items-center justify-center min-h-0 p-1.5">
            <div className="absolute z-10 left-6 top-5/12 p-1 rounded flex flex-col gap-2 bg-gray-300/50
                            group [&>*]:px-2 [&>*]:py-2 [&>*]:bg-gray-500/25 [&>*]:w-min
                                  [&>*]:disabled:opacity-50">
              <SelectImageBtn />
              <CursorBtn />
              <BrushBtn />
              <UndoBtn />
              <RedoBtn />
            </div>
            <div className="w-full h-full">
              <CanvasEditor />
            </div>
          </div>
        </CanvasHistoryProvider>
      </CanvasContext.Provider>
    </div>
  )
}
