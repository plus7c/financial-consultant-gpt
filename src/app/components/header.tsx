import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// import SearchLogo from '@/public/search.svg'
const Header = () => {
  return (
    <header className="mx-20 max-w-max py-0">
      <div className="mt-10 text-3xl font-bold text-gray-700">
        <Link href="/" scroll={false}>
          智能调研助手
        </Link>
      </div>
    </header>
  )
}

export default Header
