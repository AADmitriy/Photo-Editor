import CanvasContext from '@/features/CanvasEditor/context'
import { FabricImage } from 'fabric'
import React, { useContext } from 'react'
import AddImageIcon from '@/assets/addImage.svg?react'

export default function SelectImageBtn() {
  const {canvasEditor} = useContext(CanvasContext)

  const handleAddImage = (e) => {
    let imgObj = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(imgObj)
    reader.onload = (e) => {
      let imgUrl = e.target.result
      let imageElement = document.createElement("img")
      imageElement.src = imgUrl
      imageElement.onload = function () {
        let image = new FabricImage(imageElement)
        canvasEditor?.add(image)
        canvasEditor?.centerObject(image)
        canvasEditor?.setActiveObject(image)
      }
    }
  }

  return (
    <div>
      <label htmlFor="image_input"><AddImageIcon /></label>
      <input 
        id="image_input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAddImage} />
    </div>
  )
}
