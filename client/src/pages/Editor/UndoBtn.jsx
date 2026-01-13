import React, { useContext } from 'react'
import UndoIcon from '@/assets/undo.svg?react'
import CanvasHistoryContext from '@/features/CanvasEditor/context/CanvasHistoryContext'

export default function UndoBtn() {
  const { canUndo, undo } = useContext(CanvasHistoryContext)

  const undoLastAction = () => {
    undo()
  }
  return (
    <button disabled={ !canUndo }
            onClick={undoLastAction}>
      <UndoIcon />
    </button>
  )
}