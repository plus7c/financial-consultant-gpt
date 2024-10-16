'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { Result } from '@/app/components/result'
import { SearchForm } from '@/app/components/search-form'
// 定义搜索页面组件
export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('query') || ''
  const [queryHistory, setQueryHistory] = useState([q]);

  const handleValueChange = (query: string) => {
    if (query && !queryHistory.some(item => item === query)) {
      setQueryHistory(prev => [...prev, query]);
    }
  };
  return (
    <div className="relative w-full flex min-h-screen items-start justify-center">
      <div className="absolute w-3/5  top-24 ">
        <div className="mb-24">
          {queryHistory.map((item, index) => (
            <div key={index} className="w-full grid grid-cols-12 gap-6 ">
              <div className="mb-10 col-span-8 justify-self-start">
                <div
                  className="break-all text-4xl text-black mb-5"
                >
                  {item}
                </div>
                <Result query={item}></Result>
              </div>
              <div className='col-span-4 justify-self-center'>
                <div className='text-2xl '>目录</div>
              </div>
              <div className="col-span-12 border-b border-gray-200 my-5 w-full h-[1px]"></div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-10 left-0 right-0 p-4 rounded-2xl bg-gray-100 w-full max-w-3xl mx-auto px-1 py-1">
          <div className="flex w-full items-center justify-center ">
            <div className="w-full">
              <SearchForm onValueChange={handleValueChange} ></SearchForm>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
