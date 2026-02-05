import React from 'react'
import RangeSlider from './RangeSlider'

export default function SliderInput({range, label, value, onChange}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        <div>{label}</div>
        <input
          className="w-[5.5ch] bg-white border border-black px-1 focus:outline-1 focus:outline-black"
          value={value}
          type="number"
          onChange={onChange}
        />
      </div>
      <RangeSlider 
        range={range}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
