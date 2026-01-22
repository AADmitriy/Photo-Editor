import React from 'react'

export default function Input({label, value, onChange}) {
  return (
    <div className="relative pt-2.5">
      <label className="absolute left-3 top-0 
                      bg-neutral-300 text-xs capitalize px-0.5 z-10">{label}</label>
      <input
        className="w-full h-full rounded border-2 border-zinc-500
                   outline-none
                   px-1.5 py-0.5 focus:border-blue-500 "
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
