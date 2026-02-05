import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import CanvasContext from '../context/CanvasContext'
import { filters } from 'fabric'
import SelectInput from '@/components/ui/SelectInput'
import SliderInput from '@/components/ui/SliderInput'


export default function ImageSettings() {
  const [currentImage, setCurrentImage] = useState(null)
  const {canvasEditor} = useContext(CanvasContext)

  const [brightness, setBrightness] = useState(null)
  const [noise, setNoise] = useState(null)
  const [blur, setBlur] = useState(null)
  const [contrast, setContrast] = useState(null)
  const [saturation, setSaturation] = useState(null)
  const [vibrance, setVibrance] = useState(null)

  const rangeFilters = {
    "Brightness": { 
      value: brightness,
      setter: setBrightness,
      defaultValue: 0,
      range: {max: 1, min: -1, step: 0.05}
    },
    "Noise": {
      value: noise,
      setter: setNoise,
      defaultValue: 0,
      range: {max: 1000, min: 0, step: 10}
    },
    "Blur": {
      value: blur,
      setter: setBlur,
      defaultValue: 0,
      range: {max: 1.5, min: 0, step: 0.05}
    },
    "Contrast": {
      value: contrast,
      setter: setContrast,
      defaultValue: 0,
      range: {max: 1, min: -1, step: 0.05}
    },
    "Saturation": {
      value: saturation,
      setter: setSaturation,
      defaultValue: 0,
      range: {max: 1, min: -1, step: 0.05}
    },
    "Vibrance": {
      value: vibrance,
      setter: setVibrance,
      defaultValue: 0,
      range: {max: 1, min: -1, step: 0.05}
    },
  }

  const selectFilters = {
    "Grayscale": ['off', 'average', 'lightness', 'luminosity'],
    "Vintage": ['off', 'on'],
    "Pixelate": ['off', 'on']
  }

  const handleObjectSelected = (e) => {
    if (e.selected.length === 1 && e.selected[0].type === "image") {
      const image = e.selected[0]
      setCurrentImage(image)
    }
    else {
      setCurrentImage(null)
    }
  }

  const handleSelectionCleared = (e) => {
    setCurrentImage(null)
  }

  useEffect(() => {
    if (canvasEditor) {
      canvasEditor.on("selection:created", handleObjectSelected)
      canvasEditor.on("selection:updated", handleObjectSelected)
      canvasEditor.on("selection:cleared", handleSelectionCleared)

      return () => {
        canvasEditor.off("selection:created", handleObjectSelected)
        canvasEditor.off("selection:updated", handleObjectSelected)
        canvasEditor.off("selection:cleared", handleSelectionCleared)
      }
    }
  }, [canvasEditor, currentImage])


  const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const applyFiltersThrottled = useMemo(() => {
    return throttle(() => {
      currentImage.applyFilters();
      canvasEditor.requestRenderAll();
    }, 50)
  }, [currentImage]);

  function removeFilterByType(filterType) {
    if (!currentImage) return

    for (let i = 0; i < currentImage.filters.length; i++) {
      if (currentImage.filters[i] && currentImage.filters[i].type === filterType) {
        currentImage.filters.splice(i, 1);
        return;
      }
    }
  }

  function setValueForFilter(filterType, value) {
    if (!currentImage) return

    const filterObject = currentImage.filters.find(f => f.type === filterType)

    if (filterObject) {
      filterObject[filterType.toLowerCase()] = value
    }
    else {
      currentImage.filters.push(new filters[filterType]({
        [filterType.toLowerCase()]: value
      }))
    }
  }

  const onRangeFilterValueChange = (e, filterType) => {
    const value = Number(e.target.value)

    rangeFilters[filterType].setter(value)
    setValueForFilter(filterType, value)

    applyFiltersThrottled()
  }

  const onSelectFilterValueChange = (filterType, option) => {
    const filterObject = currentImage.filters.find(f => f.type === filterType)

    if (filterObject && option === "off") {
      removeFilterByType(filterType)
    }
    else if (!filterObject && option === "on") {
      currentImage.filters.push(new filters[filterType]());
    }
    else if (!filterObject && option !== "off") {
      currentImage.filters.push(new filters[filterType]({mode: option}));
    }
    else if (filterObject && option !== "off" && option !== "on") {
      filterObject.mode = option
    }
    else {
      return
    }

    currentImage.applyFilters()
    canvasEditor.renderAll()
  }

  return (
    <div className="px-1 pb-2.5 pt-1.5 rounded flex flex-col gap-2
                  bg-neutral-300 min-w-54 max-h-8/12 overflow-y-scroll text-sm">
      {!currentImage && (
        <div className="text-neutral-400 text-sm">
          No image selected
        </div>
      )}
      {currentImage && (
        Object.keys(selectFilters).map(filterType => {
          const filterValue = currentImage.filters.find(f => f.type === filterType)?.mode 
                              || selectFilters[filterType][0]
          return (
            <SelectInput
              key={filterType}
              label={filterType}
              value={filterValue}
              options={selectFilters[filterType]}
              onChange={(option) => onSelectFilterValueChange(filterType, option)}
            />
          )
        })
      )}
      {currentImage && (
        Object.entries(rangeFilters).map(([filterType, filterData]) => {
          return (
            <SliderInput
              key={filterType}
              range={filterData.range}
              label={filterType}
              value={filterData.value || filterData.defaultValue}
              onChange={(e) => onRangeFilterValueChange(e, filterType)}
            />
          )
        })
      )}
    </div>
  )
}
