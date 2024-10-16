'use client'

import React from 'react'
import { SearchHome } from './components/searchHome'

export default function Home() {
  return (
    <div className="relative flex flex-1 min-h-screen items-center justify-center">
      <div className="absolute w-2/5 my-auto ">
        <SearchHome></SearchHome>
      </div>
    </div>
  )
}
