import { createContext, useMemo, useRef, useState } from "react";

const CanvasHistoryContext = createContext()


export function CanvasHistoryProvider({ children }) {
  const [canUndo, setCanUndo] = useState(null)
  const [canRedo, setCanRedo] = useState(null)
  const undoRef = useRef(() => {})
  const redoRef = useRef(() => {})

  const setUndoRedo = ({ undo, redo }) => {
    undoRef.current = undo;
    redoRef.current = redo;
  };

  const value = useMemo(() => ({
    canUndo, setCanUndo,
    canRedo, setCanRedo,
    undo: () => undoRef.current(),
    redo: () => redoRef.current(),
    setUndoRedo
  }), [canUndo, canRedo])


  return (
    <CanvasHistoryContext.Provider value={value}>
        {children}
    </CanvasHistoryContext.Provider>
  )
}

export default CanvasHistoryContext
