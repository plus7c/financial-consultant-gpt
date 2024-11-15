'use client'

import { ArrowDown, X } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { Result } from '@/app/components/result'
import { SearchForm } from '@/app/components/search-form'
import { Separator } from '@/components/ui/separator'
import { useSelectedTextStore } from '@/lib/store'

// 定义搜索页面组件

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('query') || ''
  const [queryHistory, setQueryHistory] = useState([q])
  const [isCommited, setIsCommited] = useState<boolean>(false)
  const { selectedTexts, addSelectedText, removeSelectedText } =
    useSelectedTextStore()

  const handleIsCommitedChange = (value: boolean) => {
    setIsCommited(value)
  }

  const handleValueChange = (query: string) => {
    if (query && !queryHistory.some((item) => item === query)) {
      setQueryHistory((prev) => [...prev, query])
    }
  }
  // 清除引用内容
  const handleClearSelectedText = (index: number) => {
    removeSelectedText(index)
  }
  const [showScrollDownButton, setShowScrollDownButton] = useState(false) // 控制按钮显示
  const handleScrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      // 当前滚动位置
      const scrollTop = window.scrollY
      // 文档总高度
      const documentHeight = document.body.scrollHeight
      // 可视窗口高度
      const windowHeight = window.innerHeight
      // 判断是否已经滚动到底部
      if (scrollTop + windowHeight >= documentHeight - 1) {
        setShowScrollDownButton(false) // 隐藏按钮
      } else {
        setShowScrollDownButton(true) // 显示按钮
      }
    }
    // 手动调用一次，确保初始状态正确
    // handleScroll();
    // 绑定 scroll 事件
    window.addEventListener('scroll', handleScroll)
    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="my-24 flex w-full flex-1 flex-col items-start justify-end">
        <div className="w-full flex-1">
          {queryHistory.map((item, index) => (
            <div key={index} className="mb-10 w-full">
              <div className="w-full justify-self-start">
                <div className="mb-5 break-all text-4xl text-black">{item}</div>
                <Separator className="my-2"></Separator>
                <Result
                  onIsCommitedChange={handleIsCommitedChange}
                  query={item}
                  onTextSelect={addSelectedText}
                ></Result>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-10 w-full max-w-3xl rounded-2xl bg-gray-100 px-1 py-1">
        <div className="flex justify-center">
          {showScrollDownButton && (
            <button
              onClick={handleScrollToBottom}
              className="border-gray absolute bottom-14 mb-4 rounded-2xl border bg-white px-2 py-2 text-stone-700 transition-all hover:bg-gray-100"
            >
              <ArrowDown size={20} className="" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedTexts.map((text, index) => (
            <div
              key={index}
              className="relative mb-1 w-full rounded-t-lg bg-gray-100 p-3 shadow-md"
            >
              <span className="block w-4/5 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-700">
                {text}
              </span>
              <button
                onClick={() => handleClearSelectedText(index)}
                className="absolute right-2 top-1 rounded-full px-2 py-1 text-xs text-white"
              >
                <X color="#e34f4f" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col space-y-2">
          <SearchForm
            isCommited={isCommited}
            onValueChange={handleValueChange}
            onIsCommitedChange={handleIsCommitedChange}
          ></SearchForm>
        </div>
      </div>
      {/* <div className=" w-full max-w-3xl px-1 py-1 relative">
        <div className="w-full">
          <SearchForm isCommited={isCommited} onValueChange={handleValueChange} onIsCommitedChange={handleIsCommitedChange} ></SearchForm>
        </div>
      </div> */}
    </>
  )
}

