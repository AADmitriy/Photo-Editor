import React, { useState } from 'react'
import KeyboardArrowUpIcon from "@/assets/KeyboardArrowUp.svg?react"
import KeyboardArrowDownIcon from "@/assets/KeyboardArrowDown.svg?react"


export default function SelectInput({label, value, options, onChange}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentValue, setCurrentValue] = useState(value)

  const toggleSelectionMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const changeToOption = (option) => {
    setIsMenuOpen(false)
    setCurrentValue(option)
    onChange(option)
  }


  return (
    <div className="relative pt-2.5">
      <label className="absolute left-3 top-0 
                      bg-neutral-300 text-xs capitalize px-0.5 z-10">{label}</label>
      <div 
        className="relative w-full h-7 rounded border-2 border-zinc-500
                   outline-none px-1.5 py-0.5 focus:border-blue-500 ">
        <button
          className="w-full h-full text-left flex justify-between
                     [&_svg]:border-zinc-500"
          onClick={toggleSelectionMenu}>
          {currentValue}
          {isMenuOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </button>
          {isMenuOpen && (
            <div className="absolute z-100 top-7 left-0 
                            bg-white shadow-2xl flex flex-col p-1.5">
              {options.map(option => (
                <button className="px-1.5 py-0.5 text-left hover:bg-neutral-200"
                        onClick={() => {changeToOption(option)}}>
                  {option}
                </button>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}
