import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="flex items-center justify-start gap-3 font-thin">
      <div>HomePage</div>
      <Link to="/editor" className="text-fuchsia-300">Editor</Link>
    </div>
  )
}
