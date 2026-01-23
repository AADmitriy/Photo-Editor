import React, { useContext, useEffect, useState } from 'react'
import CanvasContext from '../context/CanvasContext'
import Input from '@/components/ui/Input'
import ColorInput from '@/components/ui/ColorInput'

export default function Settings() {
  const [selectedObject, setSelectedObject] = useState(null)
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [angle, setAngle] = useState("")
  const [diameter, setDiameter] = useState("")
  const [color, setColor] = useState("")
  const [opacity, setOpacity] = useState("")
  const [stroke, setStroke] = useState("")
  const [strokeWidth, setStrokeWidth] = useState("")
  const {canvasEditor} = useContext(CanvasContext)

  const allFields = [
    "width", "height", "diameter", 
    "angle", 
    "color", "opacity",
    "stroke", "strokeWidth"
  ]

  // const getObjectFields = (object) => {
  //   return allFields.filter(fieldName => fieldName in object)
  // }

  const filedNameToState = {
    width, height, diameter,
    angle,
    color, opacity,
    stroke, strokeWidth
  }

  const objectTypeToFields = {
    "rect": ["width", "height", "color", "angle", "opacity", "stroke", "strokeWidth"],
    "circle": ["diameter", "color", "angle", "opacity", "stroke", "strokeWidth"],
    "triangle": ["width", "height", "color", "angle", "opacity", "stroke", "strokeWidth"],
    "line": ["width", "height", "angle", "opacity"],
    "path": ["width", "height", "angle", "opacity"],
    "image": ["width", "height", "angle", "opacity"],
  }

  const fieldNameToFieldSet = {
    "width": (object) => {setWidth(Math.round(object.width * object.scaleX))},
    "height": (object) => {setHeight(Math.round(object.height * object.scaleY))},
    "angle": (object) => {setAngle(Math.round(object.angle))},
    "color": (object) => {setColor(object?.fill || "")},
    "diameter": (object) => {setDiameter(Math.round(object.radius * 2 * object.scaleX))},
    "opacity": (object) => {setOpacity(object.opacity)},
    "stroke": (object) => {setStroke(object?.stroke || "")}, 
    "strokeWidth": (object) => {setStrokeWidth(object.strokeWidth)}
  }

  const fieldNameToFieldClear = {
    "width": () => {setWidth("")},
    "height": () => {setHeight("")},
    "angle": () => {setAngle("")},
    "color": () => {setColor("")},
    "diameter": () => {setDiameter("")},
    "opacity": () => {setOpacity("")},
    "stroke": () => {setStroke("")}, 
    "strokeWidth": () => {setStrokeWidth("")}
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
        const cleanField = fieldNameToFieldClear[fieldName]
        cleanField()
      }
    }
  }

  const handleObjectsSelection = (e) => {
    handleUpdateSelectedObject(e.selected[0])
  }

  const clearSettings = () => {
    for (const fieldName of allFields) {
      const clearField = fieldNameToFieldClear[fieldName]
      clearField()
    }
    // setWidth("")
    // setHeight("")
    // setAngle("")
    // setColor("")
    // setDiameter("")
    // setOpacity("")
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

      setWidth(intValue)
      selectedObject.set({width: intValue / selectedObject.scaleX})
      canvasEditor.renderAll()
    },
    "height": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      setHeight(intValue)
      selectedObject.set({height: intValue / selectedObject.scaleY})
      canvasEditor.renderAll()
    },
    "angle": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      setAngle(intValue)
      selectedObject.set({angle: intValue})
      canvasEditor.renderAll()
    },
    "color": (e) => {
      if (!selectedObject) return;

      const value = e.target.value

      setColor(value)
      selectedObject.set({fill: value})
      canvasEditor.renderAll()
    },
    "diameter": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      setDiameter(intValue)
      selectedObject.set({radius: intValue / 2 / selectedObject.scaleX})
      canvasEditor.renderAll()
    },
    "opacity": (e) => {
      if (!selectedObject) return;

      const value = e.target.value

      setOpacity(value)
      selectedObject.set({opacity: value})
      canvasEditor.renderAll()
    },
    "stroke": (e) => {
      if (!selectedObject) return;

      const value = e.target.value

      setStroke(value)
      selectedObject.set({stroke: value})
      canvasEditor.renderAll()
    },
    "strokeWidth": (e) => {
      const intValue = getIntValueFromEvent(e)
      if (!selectedObject || intValue < 0) return;

      setStrokeWidth(intValue)
      selectedObject.set({strokeWidth: intValue})
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
          {objectTypeToFields[selectedObject.type].map((fieldName) => {
            if (fieldName === "color" ||
                fieldName === "stroke") {
              return (
                <ColorInput
                  key={fieldName}
                  label={fieldName}
                  value={filedNameToState[fieldName] || 0}
                  onChange={(e) => handleFieldChange(e, fieldName)}
                />
              )
            }
            return (
              <Input 
                key={fieldName}
                label={fieldName}
                value={filedNameToState[fieldName] || 0}
                onChange={(e) => handleFieldChange(e, fieldName)}
              />
            )
          })}
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
