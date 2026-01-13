import { useEffect } from "react"


export default function useBackspaceDelete(canvas) {
  const removeSelectedObject = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      const activeSelection = canvas.getActiveObjects()

      if (activeSelection) {
        activeSelection.forEach((obj) => {
          canvas.remove(obj)
        })
        canvas.discardActiveObject();
      } 
      else if (activeObject) {
        canvas.remove(activeObject)
      }

      canvas.renderAll()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        removeSelectedObject()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [canvas])
}