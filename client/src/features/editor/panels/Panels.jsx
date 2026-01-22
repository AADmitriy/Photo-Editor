import React, { useState } from 'react'
import LayersList from './LayersList'
import Settings from './Settings'
import LayersIcon from '@/assets/layers.svg?react'
import SettingsSlidersIcon from '@/assets/settingsSliders.svg?react'


export default function Panels() {
  const [showLayers, setShowLayers] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="absolute z-10 right-4 top-3/12 flex gap-2">
      <div className={showLayers ? "" : "hidden"}>
        <LayersList/>
      </div>
      <div className={showSettings ? "" : "opacity-0"}>
        <Settings/>
      </div>
      <div className="p-1 rounded flex flex-col bg-neutral-300 min-h-20 h-min
                      [&>button]:p-1 [&>button]:rounded [&>button]:hover:bg-neutral-400
                    [&_svg]:fill-black">
        <button onClick={() => setShowLayers(prev => !prev)}>
          <LayersIcon />
        </button>
        <button onClick={() => setShowSettings(prev => !prev)}>
          <SettingsSlidersIcon />
        </button>
      </div>
    </div>
  )
}
