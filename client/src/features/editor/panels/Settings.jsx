import React, { useContext, useEffect, useState } from 'react'
import CanvasContext from '../context/CanvasContext'
import Input from '@/components/ui/Input'
import ColorInput from '@/components/ui/ColorInput'

export default function Settings() {
  const [selectedObject, setSelectedObject] = useState(null)
  const {canvasEditor} = useContext(CanvasContext)

  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [scaleX, setScaleX] = useState("")
  const [scaleY, setScaleY] = useState("")
  const [angle, setAngle] = useState("")
  const [diameter, setDiameter] = useState("")
  const [color, setColor] = useState("")
  const [opacity, setOpacity] = useState("")
  const [stroke, setStroke] = useState("")
  const [strokeWidth, setStrokeWidth] = useState("")

  const allFields = [
    "width", "height", "diameter", 
    "scaleX", "scaleY",
    "angle", 
    "color", "opacity",
    "stroke", "strokeWidth"
  ]

  // const getObjectFields = (object) => {
  //   return allFields.filter(fieldName => fieldName in object)
  // }

  const fieldsData = {
    "width": {
      value: width,
      setter: setWidth,
      type: "int",
      getValueFromObject: (object) => Math.round(object.width * object.scaleX),
      setDictForObject: (object, value) => ({width: value / object.scaleX})
    },
    "height": {
      value: height,
      setter: setHeight,
      type: "int",
      getValueFromObject: (object) => Math.round(object.height * object.scaleY),
      setDictForObject: (object, value) => ({height: value / object.scaleY})
    },
    "diameter": {
      value: diameter,
      setter: setDiameter,
      type: "int",
      getValueFromObject: (object) => Math.round(object.radius * 2 * object.scaleX),
      setDictForObject: (object, value) => ({radius: value / 2 / object.scaleX})
    },
    "scaleX": {
      value: scaleX,
      setter: setScaleX,
      type: "float",
    },
    "scaleY": {
      value: scaleY,
      setter: setScaleY,
      type: "float",
    },
    "angle": {
      value: angle,
      setter: setAngle,
      type: "int",
      getValueFromObject: (object) => Math.round(object.angle),
    },
    "color": {
      value: color,
      setter: setColor,
      type: "color",
      getValueFromObject: (object) => object?.fill || "",
      setDictForObject: (object, value) => ({fill: value})
    },
    "opacity": {
      value: opacity,
      setter: setOpacity,
      type: "float",
    },
    "stroke": {
      value: stroke,
      setter: setStroke,
      type: "color",
    },
    "strokeWidth": {
      value: strokeWidth,
      setter: setStrokeWidth,
      type: "int",
    },
  }


  const objectTypeToFields = {
    "rect": ["width", "height", "color", "angle", "opacity", "stroke", "strokeWidth"],
    "circle": ["diameter", "color", "angle", "opacity", "stroke", "strokeWidth"],
    "triangle": ["width", "height", "color", "angle", "opacity", "stroke", "strokeWidth"],
    "line": ["width", "height", "angle", "opacity"],
    "path": ["width", "height", "angle", "opacity"],
    "image": ["width", "height", "scaleX", "scaleY", "angle", "opacity"],
  }


  const getFieldValueFromObject = (fieldName, object) => {
    const fieldData = fieldsData[fieldName]

    if ("getValueFromObject" in fieldData) {
      const getValueFromObject = fieldsData[fieldName].getValueFromObject
      return getValueFromObject(object)
    }

    return object[fieldName] || ""
  }

  const handleUpdateSelectedObject = (object) => {
    if (!object) return

    setSelectedObject(object)

    const objectFields = objectTypeToFields[object.type] || null

    if (!objectFields) return

    for (const fieldName of allFields) {
      const setField = fieldsData[fieldName].setter
      if (objectFields.includes(fieldName)) {
        setField(getFieldValueFromObject(fieldName, object))
      }
      else {
        setField("")
      }
    }
  }


  const handleObjectsSelection = (e) => {
    handleUpdateSelectedObject(e.selected[0])
  }

  const handleSelectionCleared = () => {
    setSelectedObject(null)

    for (const fieldName of allFields) {
      const setField = fieldsData[fieldName].setter
      setField("")
    }
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

  const getFieldSetDict = (fieldName, object, value) => {
    const fieldData = fieldsData[fieldName]

    if ("setDictForObject" in fieldData) {
      const setDictForObject = fieldsData[fieldName].setDictForObject
      return setDictForObject(object, value)
    }

    return {[fieldName]: value}
  }

  const handleFieldChange = (e, fieldName) => {
    if (!selectedObject) return;

    const fieldType = fieldsData[fieldName].type

    let value = ""

    if (fieldType === "int") {
      value = getIntValueFromEvent(e)
      if (value < 0) return;
    }
    else if (fieldType === "float") {
      value = e.target.value
      if (value < 0) return;
    }
    else if (fieldType === "color") {
      value = e.target.value
    }
    else {
      throw new Error(`Invalid field type '${fieldType}' in settings fields`);
    }

    const setField = fieldsData[fieldName].setter
    setField(value)

    selectedObject.set(getFieldSetDict(fieldName, selectedObject, value))
    canvasEditor.renderAll()
  }


  return (
    <div className="px-1 pb-2.5 pt-1.5 rounded flex flex-col gap-2 bg-neutral-300 min-w-34 text-sm">
      {selectedObject && selectedObject.type in objectTypeToFields && (
        <>
          {objectTypeToFields[selectedObject.type].map((fieldName) => {
            if (fieldsData[fieldName].type === "color") {
              return (
                <ColorInput
                  key={fieldName}
                  label={fieldName}
                  value={fieldsData[fieldName].value}
                  onChange={(e) => handleFieldChange(e, fieldName)}
                />
              )
            }
            return (
              <Input
                key={fieldName}
                label={fieldName}
                value={fieldsData[fieldName].value || 0}
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
