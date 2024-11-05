'use client'

import React, { FC } from 'react'
import { PresetQuery } from '@/app/components/preset-query'
import { SearchForm } from './search-form'

export const SearchHome: FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col items-center max-w-lg mx-auto mb-5">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl max-md:text-2xl animate-fadeInUp animation-delay-0">您的专属AI顾问</h1>
        <p className="mt-6 text-gray-500 dark:text-gray-300 text-2xl max-md:hidden animate-fadeInUp animation-delay-0">
          智能分析，精准建议，助您做出最佳决策
        </p>
      </div>
      <div className="rounded-2xl bg-gray-100  shadow-2xl">
        <div className="flex h-[88px] items-center rounded-2xl bg-white">
          <SearchForm isHome={true}></SearchForm>
        </div>
        <div className="flex flex-col flex-wrap space-x-1 px-6 py-3 text-[12px]/[18px] md:flex-row   ">
          <PresetQuery query="退伍军人退休福利政策?" />
          <PresetQuery query="琶洲人工智能产业发展前景" />
          <PresetQuery query="广州市低空经济发展前景研究" />
        </div>
      </div>
    </div>


  )
}
