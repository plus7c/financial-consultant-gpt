'use client'

import React, { FC  } from 'react'
import { PresetQuery } from '@/app/components/preset-query'
import { SearchForm } from './search-form'

export const SearchHome: FC = () => {
  return (
    <div className="rounded-2xl bg-gray-100 p-1">
      <div className="flex h-[88px] items-center rounded-2xl bg-white">
        <SearchForm isHome={true}></SearchForm>
      </div>
      <div className="flex flex-col flex-wrap px-6 py-3 text-[12px]/[18px] md:flex-row md:mx-1 md:my-1">
        <PresetQuery query="列出Transformer构架的优劣?" />
        <PresetQuery query="暗物质和暗能量对宇宙学理论的挑战" />
        <PresetQuery query="广州市低空经济发展前景研究" />
      </div>
    </div>

  )
}
