import { createContext, useMemo, useState } from "react";

const CanvasContext = createContext()


export function CanvasContextProvider({children}) {
  const [canvasEditor, setCanvasEditor] = useState()

  const value = useMemo(() => ({
    canvasEditor, setCanvasEditor
  }), [canvasEditor])

  return (
    <CanvasContext.Provider value={value}>
        {children}
    </CanvasContext.Provider>
  )
}

export default CanvasContext
