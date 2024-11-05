'use client'

import React from 'react'

import { SearchHome } from './components/searchHome'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-1 items-center justify-center max-md:mt-64 max-md:items-start">
      <div className="absolute my-auto md:w-2/5">
        <SearchHome></SearchHome>
      </div>
    </div>
  )
}
