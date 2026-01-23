import { useEffect } from "react"


export default function useKeyboardShortcuts(canvas, undo, redo) {
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

  function isTextInputFocused() {
    const el = document.activeElement;
    if (!el) return false;
  
    if (el.closest('[data-editor-ignore-shortcuts="true"]')) {
      return true;
    }
  
    return (
      el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.isContentEditable
    );
  }
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        if (isTextInputFocused()) return;

        removeSelectedObject()
      }
      else if (e.ctrlKey && (e.key === "z" || e.key === "Z")) {
        if (e.shiftKey) {
          redo()
        }
        else {
          undo()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [canvas, undo, redo])
}