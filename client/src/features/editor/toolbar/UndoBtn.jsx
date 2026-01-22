import React, { useContext } from 'react'
import UndoIcon from '@/assets/undo.svg?react'
import CanvasHistoryContext from '../context/CanvasHistoryContext'

export default function UndoBtn() {
  const { canUndo, undo } = useContext(CanvasHistoryContext)

  const undoLastAction = () => {
    undo()
  }
  
  return (
    <button className="toolbar-btn"
            disabled={ !canUndo }
            onClick={undoLastAction}>
      <UndoIcon />
    </button>
  )
}