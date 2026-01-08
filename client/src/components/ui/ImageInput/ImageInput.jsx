import React from 'react'

export default function ImageInput({handleAddImage}) {
  return (
    <input 
      type="file"
      accept="image/*"
      label="Add image"
      onChange={handleAddImage} />
  )
}
