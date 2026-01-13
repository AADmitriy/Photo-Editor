import React, { useContext } from 'react'
import RedoIcon from '@/assets/redo.svg?react'
import CanvasHistoryContext from '@/features/CanvasEditor/context/CanvasHistoryContext'

export default function RedoBtn() {
  const { canRedo, redo } = useContext(CanvasHistoryContext)

  const redoLastAction = () => {
    redo()
  }

  return (
    <button disabled={ !canRedo }
            onClick={redoLastAction}>
      <RedoIcon />
    </button>
  )
}