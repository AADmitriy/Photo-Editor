import CanvasEditor from './canvas'
import { CanvasContextProvider } from './context/CanvasContext'
import { CanvasHistoryProvider } from './context/CanvasHistoryContext'
import { CanvasZoomProvider } from './context/CanvasZoomContext'
import { CanvasSizeProvider } from './context/CanvasSizeContext'
import Toolbar from './toolbar'
import Panels from './panels'
import React from 'react'
import CanvasZoomSettings from './panels/CanvasZoomSettings'


export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col">
      <CanvasContextProvider>
        <CanvasHistoryProvider>
        <CanvasZoomProvider>
        <CanvasSizeProvider>
          <div className="h-7 font-thin mt-0">EditorPage</div>
          <div className="relative flex-1 flex items-center justify-center min-h-0">
            <Toolbar />
            <Panels />
            <CanvasZoomSettings />
            <CanvasEditor />
          </div>
        </CanvasSizeProvider>
        </CanvasZoomProvider>
        </CanvasHistoryProvider>
      </CanvasContextProvider>
    </div>
  )
}
