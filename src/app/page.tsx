'use client'

import React from 'react'

import { SearchHome } from './components/searchHome'

export default function Home() {
  return (
    <div className="relative flex  flex-1 items-center justify-center min-h-screen max-md:mt-64 max-md:items-start">
      <div className="absolute my-auto md:w-2/5">
        <SearchHome></SearchHome>
      </div>
    </div>
  )
}
