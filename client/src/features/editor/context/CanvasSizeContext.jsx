import { createContext, useMemo, useState } from "react";

const CanvasSizeContext = createContext()


export function CanvasSizeProvider({ children }) {
  const [canvasWidth, setCanvasWidth] = useState(500)
  const [canvasHeight, setCanvasHeight] = useState(450)

  const value = useMemo(() => ({
    canvasWidth, setCanvasWidth,
    canvasHeight, setCanvasHeight
  }), [canvasWidth, canvasHeight])

  return (
    <CanvasSizeContext.Provider value={value}>
        {children}
    </CanvasSizeContext.Provider>
  )
}

export default CanvasSizeContext