import CanvasContext from '@/features/CanvasEditor/context/CanvasContext'
import { Canvas } from 'fabric'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import ArrowUpIcon from '@/assets/arrowUp.svg?react'
import ArrowDownIcon from '@/assets/arrowDown.svg?react'


export default function LayersList() {
  const [layers, setLayers] = useState([])
  const [selectedLayers, setSelectedLayers] = useState([])
  const {canvasEditor} = useContext(CanvasContext)
  
  const moveSelectedLayer = (direction) => {
    if (!selectedLayers.length === 1) return

    const objects = canvasEditor.getObjects()
    const object = objects.find(obj => obj.id === selectedLayers[0].id)

    if (object) {
      const currentPos = objects.findIndex(obj => {
        return obj.id === object.id
      })
      if (currentPos + direction < 0 
          || currentPos + direction >= objects.length) {
        return
      }
      const temp = objects[currentPos]
      objects[currentPos] = objects[currentPos + direction]
      objects[currentPos + direction] = temp


      const backgroundColor = canvasEditor.backgroundColor

      canvasEditor.clear()

      objects.forEach(obj => canvasEditor.add(obj))

      canvasEditor.backgroundColor = backgroundColor

      canvasEditor.renderAll()

      objects.forEach((obj, index) => { obj.zIndex = index })

      canvasEditor.setActiveObject(object)

      canvasEditor.renderAll()

      updateLayers()
    }
  }

  const {
    isLayerUpBtnDisabled, 
    isLayerDownBtnDisabled
  } = useMemo( () => {
    if (!(selectedLayers.length === 1 && canvasEditor)) {
      return {
        isLayerUpBtnDisabled: true,
        isLayerDownBtnDisabled: true
      }
    }

    const objects = canvasEditor.getObjects()
    const objPos = objects.findIndex(obj => {
      return obj.id === selectedLayers[0].id
    })

    return {
      isLayerUpBtnDisabled: objPos >= objects.length - 1,
      isLayerDownBtnDisabled: objPos <= 0
    }

  }, [selectedLayers, canvasEditor])


  const addIdToObject = (object) => {
    if (!object.id) {
      const timestamp = new Date().getTime()
      object.id = `${object.type}_${timestamp}`
    }
  }

  Canvas.prototype.updateZIndices = function () {
    const objects = canvasEditor.getObjects()
    objects.forEach((obj, index) => {
      addIdToObject(obj)
      obj.zIndex = index
    })
  }

  const updateLayers = () => {
    if (canvasEditor) {
      canvasEditor.updateZIndices()
      const objects = canvasEditor
      .getObjects()
      .filter((obj) => !(
        obj.type.startsWith("vertical-") || obj.type.startsWith("horizontal-")
      ))
      .map((obj) => ({
        id: obj.id,
        type: obj.type,
        zIndex: obj.zIndex
      }))
      setLayers([...objects].reverse())
    }
  }

  const handleObjectSelected = (e) => {
    const deselectedObjectsIds = new Set(e.deselected?.map(obj => obj.id))
    setSelectedLayers(prev =>
      [...prev.filter(obj => !deselectedObjectsIds.has(obj.id)), ...e.selected]
    )
  }

  const handleObjectDeselected = (e) => {
    if (e.deselected.length > 0) {
      const deselectedObjectsIds = new Set(e.deselected.map(obj => obj.id))
      setSelectedLayers(prev => prev.filter(obj => !deselectedObjectsIds.has(obj.id)))
    }
  }

  const selectLayerInCanvas = (layerId) => {
    const object = canvasEditor.getObjects().find(obj => obj.id === layerId)

    if (object) {
      canvasEditor.setActiveObject(object)
      canvasEditor.renderAll()
    }
  }


  useEffect(() => {
    if (canvasEditor) {
      canvasEditor.on("object:added", updateLayers)
      canvasEditor.on("object:removed", updateLayers)
      canvasEditor.on("object:modified", updateLayers)

      canvasEditor.on("selection:created", handleObjectSelected)
      canvasEditor.on("selection:updated", handleObjectSelected)
      canvasEditor.on("selection:cleared", handleObjectDeselected)

      updateLayers()

      return () => {
        canvasEditor.off("object:added", updateLayers)
        canvasEditor.off("object:removed", updateLayers)
        canvasEditor.off("object:modified", updateLayers)

        canvasEditor.off("selection:created", handleObjectSelected)
        canvasEditor.off("selection:updated", handleObjectSelected)
        canvasEditor.off("selection:cleared", handleObjectDeselected)
      }
    }
  }, [canvasEditor])

  return (
    <div className="absolute z-10 right-4 top-3/12 p-1 rounded flex flex-col gap-2 bg-gray-400">
      <div className="flex justify-start items-center gap-4
                      group [&>button]:bg-blue-200 [&>button]:p-2 [&>button]:disabled:bg-gray-100">
        <button disabled={isLayerUpBtnDisabled}
                onClick={() => moveSelectedLayer(1)}>
          <ArrowUpIcon />
        </button>
        <button disabled={isLayerDownBtnDisabled}
                onClick={() => moveSelectedLayer(-1)}>
          <ArrowDownIcon />
        </button>
      </div>
      <ul className="list-none">
        {layers.map((obj, index) => (
          <li key={obj.id} 
              className={`px-2 py-1.5 hover:bg-gray-200/50 rounded
                          ${selectedLayers.some(layer => layer.id === obj.id) ? "bg-gray-200!" : ""}`}
              onClick={() => selectLayerInCanvas(obj.id)}>
            {obj.type} {`(${obj.zIndex})`}
          </li>
        ))}
      </ul>
    </div>
  )
}
