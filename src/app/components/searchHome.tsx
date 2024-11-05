'use client'

import React, { FC } from 'react'

import { PresetQuery } from '@/app/components/preset-query'

import { SearchForm } from './search-form'

export const SearchHome: FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mb-5 flex max-w-lg flex-col items-center">
        <h1 className="animation-delay-0 animate-fadeInUp text-3xl font-semibold text-gray-800 dark:text-white max-md:text-2xl lg:text-4xl">
          您的专属AI顾问
        </h1>
        <p className="animation-delay-0 mt-6 animate-fadeInUp text-2xl text-gray-500 dark:text-gray-300 max-md:hidden">
          智能分析，精准建议，助您做出最佳决策
        </p>
      </div>
      <div className="rounded-2xl bg-gray-100 shadow-2xl">
        <div className="flex h-[88px] items-center rounded-2xl bg-white">
          <SearchForm isHome={true}></SearchForm>
        </div>
        <div className="flex flex-col flex-wrap space-x-1 px-6 py-3 text-[12px]/[18px] md:flex-row">
          <PresetQuery query="退伍军人退休福利政策?" />
          <PresetQuery query="琶洲人工智能产业发展前景" />
          <PresetQuery query="广州市低空经济发展前景研究" />
        </div>
      </div>
    </div>
  )
}
