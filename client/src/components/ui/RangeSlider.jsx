import React, { useEffect, useRef } from 'react'

export default function RangeSlider({range, value, onChange}) {
  const {max, min, step} = range

  const totalRange = Math.abs(max) + Math.abs(min)
  const valueNum = Number(value)
  const rightOffset = 100 - (((Math.abs(min) + valueNum) / totalRange) * 100) + "%"

  return (
    <div className="relative py-2 px-0.5">
      <div className="relative w-full h-1 rounded-md bg-gray-300 border border-black">
        <div className="absolute h-0.75 left-0 bg-black rounded" 
             style={{right: rightOffset}}>
        </div>
      </div>
      <input 
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onInput={(e) => onChange(e)}
        onMouseUp={(e) => onChange(e)}
        onTouchEnd={(e) => onChange(e)}
        className="range-slider appearance-none absolute pointer-events-none
                   w-full h-1 px-0.5 top-2 left-0 bg-transparent"
      />
    </div>
  )
}
