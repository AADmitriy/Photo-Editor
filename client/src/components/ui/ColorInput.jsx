import React from 'react'

export default function ColorInput({label, value, onChange}) {
  return (
    <div className="relative pt-2.5">
      <label className="absolute left-3 top-0 
                        bottom-transparent
                        text-xs capitalize px-0.5 z-10">{label}</label>
      <input
        className="w-full h-7 rounded border-2 border-zinc-500
                   outline-none 
                   px-1.5 focus:border-blue-500 "
        type={"color"}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
