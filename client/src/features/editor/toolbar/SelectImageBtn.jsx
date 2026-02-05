import CanvasContext from '../context/CanvasContext'
import { FabricImage } from 'fabric'
import React, { useContext, useState } from 'react'
import AddImageIcon from '@/assets/addImage.svg?react'
import CanvasSizeContext from '../context/CanvasSizeContext'

export default function SelectImageBtn({activeMenuId, setActiveMenuId, activeToolId, setActiveToolId}) {
  const {canvasEditor} = useContext(CanvasContext)
  const {setCanvasWidth, setCanvasHeight} = useContext(CanvasSizeContext)
  const [mode, setMode] = useState(null)
  const addImageToolId = "addImage"
  const addImageMenuId = "addImageMenu"
  const isMenuOpen = activeMenuId === addImageMenuId

  const scaleImageToCanvasSize = (image) => {
    if (image.width > image.height) {
      image.scaleToWidth(canvasEditor.width * 0.65)
    }
    else {
      image.scaleToHeight(canvasEditor.height * 0.65)
    }
  }

  const scaleCanvasToImageSize = (image) => {
    image.scaleToWidth((canvasEditor.width + canvasEditor.height) / 2)

    setCanvasWidth(Math.round(image.width * image.scaleX))
    setCanvasHeight(Math.round(image.height * image.scaleY))
  }

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

        const addImageToCanvas = () => {
          canvasEditor?.add(image)
          canvasEditor?.centerObject(image)
          canvasEditor?.setActiveObject(image)
          setActiveMenuId(null)
        }

        if (mode === "scaleImage") {
          scaleImageToCanvasSize(image)
          addImageToCanvas()
        }
        else {
          scaleCanvasToImageSize(image)
          setTimeout(addImageToCanvas, 100)
        }
      }
    }
  }

  const handleAddImageBtnClick = () => {
    if (activeToolId !== addImageToolId) {
      setActiveToolId(addImageToolId)
      setActiveMenuId(addImageMenuId)
      return
    }
    
    if (isMenuOpen) {
      setActiveMenuId(null)
    }
    else {
      setActiveMenuId(addImageMenuId)
    }
  }

  const handleChoseModeBtn = (mode) => {
    setMode(mode)
    
  }

  return (
    <div className="relative">
      <button className={`toolbar-btn 
                          ${activeToolId === addImageToolId ? "bg-blue-400/50! hover:bg-blue-500/50!" : ""}`}
              onClick={handleAddImageBtnClick}>
        <AddImageIcon />
      </button>
      { isMenuOpen && activeToolId === addImageToolId && 
        <div className="absolute top-0 -right-36
                        flex flex-col bg-white text-sm font-thin
                        [&_div]:flex [&_div]:items-center [&_div]:gap-2
                        [&_div]:px-1 [&_div]:py-0.5 [&_div]:hover:bg-neutral-200
                        [&_svg]:w-5 [&_svg]:fill-neutral-500">
          <div onClick={() => handleChoseModeBtn("scaleImage")}>
            <label htmlFor="image_input1">Add image to canvas</label>
            <input 
              id="image_input1"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddImage} />
          </div>
          <div onClick={() => handleChoseModeBtn("scaleCanvas")}>
            <label htmlFor="image_input2">Scale canvas to image</label>
            <input 
              id="image_input2"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAddImage} />
          </div>
        </div>
      }
    </div>
    
  )
}
