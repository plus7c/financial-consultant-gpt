'use client'

import React from 'react'
import { SearchHome } from './components/searchHome'

export default function Home() {
  return (
    <div className="relative flex flex-1 min-h-screen items-center justify-center max-md:items-start max-md:mt-64">
      <div className="absolute md:w-2/5 my-auto ">
        <SearchHome></SearchHome>
      </div>
    </div>
  )
}
