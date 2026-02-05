import { createContext, useMemo, useState } from "react";

const CanvasZoomContext = createContext()


export function CanvasZoomProvider({ children }) {
  const [offset, setOffset] = useState({x: 175, y: 150})
  const [scale, setScale] = useState(0.8)

  const value = useMemo(() => ({
    offset, setOffset,
    scale, setScale
  }), [offset, scale])

  return (
    <CanvasZoomContext.Provider value={value}>
        {children}
    </CanvasZoomContext.Provider>
  )
}

export default CanvasZoomContext