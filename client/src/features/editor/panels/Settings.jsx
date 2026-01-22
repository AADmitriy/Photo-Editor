import React, { useContext, useEffect, useState } from 'react'
import CanvasContext from '../context/CanvasContext'
import Input from '@/components/ui/Input'

export default function Settings() {
  const [selectedObject, setSelectedObject] = useState(null)
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [angle, setAngle] = useState("")
  const [diameter, setDiameter] = useState("")
  const [color, setColor] = useState("")
  const {canvasEditor} = useContext(CanvasContext)

  const allFields = ["width", "height", "angle", "diameter", "color",]

  // const getObjectFields = (object) => {
  //   return allFields.filter(fieldName => fieldName in object)
  // }

  const filedNameToState = {
    width,
    height,
    angle,
    color,
    diameter
  }

  const objectTypeToFields = {
    "rect": ["width", "height", "color", "angle"],
    "circle": ["diameter", "color", "angle"],
    "triangle": ["width", "height", "color", "angle"],
    "line": ["width", "height", "angle"],
    "path": ["width", "height", "angle"],
    "image": ["width", "height", "angle"],
  }

  const fieldNameToFieldSet = {
    "width": (object) => {setWidth(Math.round(object.width * object.scaleX))},
    "height": (object) => {setHeight(Math.round(object.height * object.scaleY))},
    "angle": (object) => {setAngle(Math.round(object.angle))},
    "color": (object) => {setColor(object?.fill || "")},
    "diameter": (object) => {setDiameter(Math.round(object.radius * 2 * object.scaleX))},
  }

  const fieldNameToFieldClean = {
    "width": () => {setWidth("")},
    "height": () => {setHeight("")},
    "angle": () => {setAngle("")},
    "color": () => {setColor("")},
    "diameter": () => {setDiameter("")},
  }


  const handleUpdateSelectedObject = (object) => {
    if (!object) return

    setSelectedObject(object)

    const objectFields = objectTypeToFields[object.type] || null

    if (!objectFields) return

    for (const fieldName of allFields) {
      if (objectFields.includes(fieldName)) {
        const setField = fieldNameToFieldSet[fieldName]
        setField(object)
      }
      else {
        const cleanField = fieldNameToFieldClean[fieldName]
        cleanField(object)
      }
    }
  }

  const handleObjectsSelection = (e) => {
    handleUpdateSelectedObject(e.selected[0])
  }

  const clearSettings = () => {
    setWidth("")
    setHeight("")
    setAngle("")
    setColor("")
    setDiameter("")
  }

  const handleSelectionCleared = () => {
    setSelectedObject(null)
    clearSettings()
  }

  const handleObjectUpdated = (e) => {
    handleUpdateSelectedObject(e.target)
  }


  useEffect(() => {
    if (canvasEditor) {
      canvasEditor.on("selection:created", handleObjectsSelection)
      canvasEditor.on("selection:updated", handleObjectsSelection)
      canvasEditor.on("selection:cleared", handleSelectionCleared)

      canvasEditor.on("object:updated", handleObjectUpdated)
      canvasEditor.on("object:modified", handleObjectUpdated)
      canvasEditor.on("object:scaling", handleObjectUpdated)
      canvasEditor.on("object:rotated", handleObjectUpdated)

      return () => {
        canvasEditor.off("selection:created", handleObjectsSelection)
        canvasEditor.off("selection:updated", handleObjectsSelection)
        canvasEditor.off("selection:cleared", handleSelectionCleared)

        canvasEditor.off("object:updated", handleObjectUpdated)
        canvasEditor.off("object:modified", handleObjectUpdated)
        canvasEditor.off("object:scaling", handleObjectUpdated)
        canvasEditor.off("object:rotated", handleObjectUpdated)
      }
    }
  }, [canvasEditor])



  const getIntValueFromEvent = (e) => {
    const value = e.target.value.replace(/,/g, "")
    return parseInt(value, 10) || 0
  }

  const fieldNameToFieldUpdate = {
    "width": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      selectedObject.set({width: intValue / selectedObject.scaleX})
      setWidth(intValue)
      canvasEditor.renderAll()
    },
    "height": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      selectedObject.set({height: intValue / selectedObject.scaleY})
      setHeight(intValue)
      canvasEditor.renderAll()
    },
    "angle": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      selectedObject.set({angle: intValue})
      setAngle(intValue)
      canvasEditor.renderAll()
    },
    "color": (e) => {},
    "diameter": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      selectedObject.set({radius: intValue / 2 / selectedObject.scaleX})
      // console.log(intValue, intValue / 2 / selectedObject.scaleX)
      setDiameter(intValue)
      canvasEditor.renderAll()
    },
  }

  const handleFieldChange = (e, fieldName) => {
    const changeField = fieldNameToFieldUpdate[fieldName]
    changeField(e)
  }

  


  return (
    <div className="px-1 pb-2.5 pt-1.5 rounded flex flex-col gap-2 bg-neutral-300 min-w-34 text-sm">
      {selectedObject && selectedObject.type in objectTypeToFields && (
        <>
          {objectTypeToFields[selectedObject.type].map((fieldName) => (
            <Input 
              key={fieldName}
              label={fieldName}
              value={filedNameToState[fieldName] || 0}
              onChange={(e) => handleFieldChange(e, fieldName)}
            />
          ))}
        </>
      )}
      {!selectedObject && (
      <div className="text-neutral-400 text-sm">
        No object selected
      </div>
      )}
    </div>
  )
}
