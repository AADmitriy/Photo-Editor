import CanvasEditor from './canvas'
import { CanvasContextProvider } from './context/CanvasContext'
import { CanvasHistoryProvider } from './context/CanvasHistoryContext'
import Toolbar from './toolbar'
import Panels from './panels'
import React from 'react'

export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col">
      <CanvasContextProvider>
        <CanvasHistoryProvider>
          <div className="h-14 font-thin mt-0">EditorPage</div>
          <div className="relative flex-1 flex items-center justify-center min-h-0 p-1.5">
            <Toolbar />
            <Panels />
            <div className="w-full h-full">
              <CanvasEditor />
            </div>
          </div>
        </CanvasHistoryProvider>
      </CanvasContextProvider>
    </div>
  )
}
