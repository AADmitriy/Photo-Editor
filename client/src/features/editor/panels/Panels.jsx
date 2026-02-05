import React, { useState } from 'react'
import LayersList from './LayersList'
import Settings from './Settings'
import CanvasSettings from './CanvasSettings'
import ImageSettings from './ImageSettings'
import LayersIcon from '@/assets/layers.svg?react'
import SettingsSlidersIcon from '@/assets/settingsSliders.svg?react'
import AspectRatioIcon from '@/assets/aspectRatio.svg?react'
import FilterIcon from "@/assets/filter.svg?react"


export default function Panels() {
  const [activePanelId, setActivePanelId] = useState(null)

  const toggleActivePanel = (panelId) => {
    if (panelId === activePanelId) {
      setActivePanelId(null)
    }
    else {
      setActivePanelId(panelId)
    }
  }

  return (
    <div className="absolute z-10 right-4 top-3/12 flex gap-2">
      <div className={activePanelId === "layersList" ? "" : "hidden"}>
        <LayersList/>
      </div>
      <div className={activePanelId === "settings" ? "" : "hidden"}>
        <Settings/>
      </div>
      <div className={activePanelId === "canvasSettings" ? "" : "hidden"}>
        <CanvasSettings/>
      </div>
      <div className={activePanelId === "imageSettings" ? "" : "hidden"}>
        <ImageSettings/>
      </div>
      <div className="p-1 rounded flex flex-col bg-neutral-300 min-h-20 h-min
                      [&>button]:p-1 [&>button]:rounded [&>button]:hover:bg-neutral-400
                    [&_svg]:fill-black">
        <button onClick={() => toggleActivePanel("layersList")}>
          <LayersIcon />
        </button>
        <button onClick={() => toggleActivePanel("settings")}>
          <SettingsSlidersIcon />
        </button>
        <button onClick={() => toggleActivePanel("canvasSettings")}>
          <AspectRatioIcon />
        </button>
        <button onClick={() => toggleActivePanel("imageSettings")}>
          <FilterIcon />
        </button>
      </div>
    </div>
  )
}
