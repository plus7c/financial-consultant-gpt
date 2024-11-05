'use client'

import { ArrowDown, Search as SearchIcon } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface SearchFormProps {
  onValueChange?: (value: string) => void
  onIsCommitedChange?: (value: boolean) => void
  isCommited?: boolean
  isHome?: boolean
}
export const SearchForm: FC<SearchFormProps> = ({
  onValueChange,
  onIsCommitedChange,
  isCommited = true,
  isHome = false,
}) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(true)
  const router = useRouter()

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (value && isCommited) {
            setValue('')
            onIsCommitedChange?.(false)
            if (isHome) {
              router.push(`/search?query=${value}`)
            } else {
              onValueChange?.(value)
            }
          }
        }}
        className={`relative flex w-full items-center rounded-2xl bg-white ${isFocused ? 'border-slate-600' : ''} `}
      >
        <div className="relative w-full">
          <textarea
            id="search-bar"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              const { code, key, shiftKey } = e
              if (code === 'Enter') {
                if (key !== 'Process' && !shiftKey && isCommited) {
                  e.preventDefault()
                  setValue('')
                  onIsCommitedChange?.(false)
                  if (isHome) {
                    router.push(`/search?query=${value}`)
                  } else {
                    onValueChange?.(value)
                  }
                }
              }
            }}
            autoFocus
            placeholder="输入Enter键发送，Shift+Enter键换行"
            maxLength={500}
            rows={1}
            wrap="hard"
            className={`mx-6 w-5/6 flex-1 resize-none overflow-auto bg-[transparent] py-4 pr-10 outline-none max-md:text-nowrap ${isHome ? 'text-1xl' : 'text-sm'}`}
          />
        </div>
        <button
          type="submit"
          className={`absolute bottom-0 right-3 top-0 m-auto flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors ${
            isFocused
              ? 'bg-black hover:bg-gray-800'
              : 'bg-[#c9c9c6] hover:bg-gray-500'
          }`}
        >
          <SearchIcon size={16} />
        </button>
      </form>
    </>
  )
}
