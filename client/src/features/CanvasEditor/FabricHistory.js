class FabricHistory {
  constructor(canvas, onHistoryChange) {
    this.canvas = canvas
    this.onHistoryChange = onHistoryChange
    this.undoStack = []
    this.redoStack = []
    this.isRestoring = false

    this.save()
  }

  _emit() {
    this.onHistoryChange?.({
      canUndo: this.undoStack.length > 1,
      canRedo: this.redoStack.length > 0
    })
  }

  save() {
    if (this.isRestoring) return;

    const json = this.canvas.toJSON()
    this.undoStack.push(json)
    this.redoStack = []
    this._emit()
  }

  undo() {
    if (this.undoStack.length <= 1) return;
    
    this.isRestoring = true

    const current = this.undoStack.pop()
    this.redoStack.push(current)

    const previous = this.undoStack[this.undoStack.length - 1]

    this._restore(previous)
  }

  redo() {
    if (this.redoStack.length < 1) return;

    this.isRestoring = true

    const next = this.redoStack.pop()
    this.undoStack.push(next)

    this._restore(next)
  }

  _restore(state) {
    this.canvas.loadFromJSON(state, () => {
      this.canvas.requestRenderAll()
      
    })
    .then(() => {
      if (state.objects.length === 0) {
        this.canvas.requestRenderAll()
      }
      this.isRestoring = false
      this._emit()
    })
  }
}

export default FabricHistory