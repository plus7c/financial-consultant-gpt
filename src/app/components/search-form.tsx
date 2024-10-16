'use client'

import { Search as SearchIcon } from 'lucide-react'
import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchFormProps {
  onValueChange?: (value: string) => void
  isHome?: boolean
}
export const SearchForm: FC<SearchFormProps> = ({
  onValueChange,
  isHome = false
}) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(true)
  const router = useRouter()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (value) {
          setValue('')
          if (isHome) {
            router.push(`/search?query=${value}`)
          } else {
            onValueChange?.(value)
          }
        }
      }}
      className="relative flex w-full items-center rounded-2xl bg-white"
    >
      <div className="relative w-full mr-3">
        <textarea
          id="search-bar"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            const { code, key, shiftKey } = e
            if (code === 'Enter') {
              if (key !== 'Process' && !shiftKey) { 
                e.preventDefault()
                if (isHome) {
                  router.push(`/search?query=${value}`)
                } else {
                  onValueChange?.(value)
                }
              }
            }
          }}
          autoFocus
          placeholder="请输入，Enter键发送，Shift+Enter键换行"
          maxLength={500}
          rows={2}
          wrap="hard"
          className={` resize-none mx-6 w-5/6 flex-1 overflow-auto bg-[transparent] py-4 pr-10 text-1xl outline-none focus:border-[#1d1d1b]`}
        />
        {value && (
          <button
            type="reset"
            onClick={() => setValue('')}
            className="absolute bottom-0 right-14 top-0 m-4 m-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className={`absolute bottom-0 right-3 top-0 m-auto flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors ${isFocused
          ? 'bg-black hover:bg-gray-800'
          : 'bg-[#c9c9c6] hover:bg-gray-500'
          }`}
      >
        <SearchIcon size={16} />
      </button>
    </form>
  )
}
