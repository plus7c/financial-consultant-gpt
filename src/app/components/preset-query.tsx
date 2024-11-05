import React, { FC } from 'react'
import Link from 'next/link'

export const PresetQuery: FC<{ query: string }> = ({ query }) => {
  return (
    <Link
      prefetch={false}
      title={query}
      href={{
        pathname: '/search',
        query: { query: query },
      }}
      className="flex h-[26px] items-center text-nowrap rounded-full border border-[#c9c9c6] bg-white px-4 py-2"
    >
      {query}
    </Link>
  )
}
