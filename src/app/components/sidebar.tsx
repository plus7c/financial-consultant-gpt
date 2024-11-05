'use client'
import React, { FC, useState } from 'react'
import Link from 'next/link'

const Sidebar: FC = () => {
  const Menus = [
    { title: "主页", src: "Chart_fill" },
    { title: "新聊天", src: "Search" },
    { title: "历史记录 ", src: "Chat", gap: true },
    { title: "设置", src: "Setting" },
    { title: "账户", src: "User" },
  ];

  const [isOpen, setOpen] = useState(true)

  return (
    <div className={` flex flex-col  md:flex-row `}>
      {/* Sidebar */}
      <div className={`
        ${isOpen ? "md:w-72" : "md:w-20 "}
        w-full
        bg-blue-theme  relative duration-300  
        flex-none 
        `}>
        <div className='sticky top-0 p-5'>
          <img
            src="/assets/control.png"
            className={`absolute cursor-pointer md:-right-3 md:top-9  right-3 w-7 border-dark-purple
            border-2 rounded-full max-md:rotate-90 ${!isOpen && "max-md:-rotate-90"}  ${!isOpen && "rotate-180"} `}
            onClick={() => setOpen(!isOpen)}
          />
          <Link href='/' scroll={false} className="flex gap-x-4 items-center justify-start">
            <img
              src="/assets/gem3.png"
              className={`cursor-pointer duration-500 ${isOpen && "rotate-[360deg]"} bg-cover w-10 h-10`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${!isOpen && "scale-0"}`}
            >
              智能调研助手
            </h1>
          </Link>
          <hr className="my-4 border-gray-500" />
          <ul className={`pt-6 ${!isOpen && "max-md:scale-0"}`}>
            <Link href='/' scroll={false}>
              <li
                className={`flex rounded-md mt-2 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                "bg-light-white"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777d88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
                  主页
                </span>
              </li>
            </Link>
            <Link href='/' scroll={false}>
              <li
                className={`flex rounded-md mt-2 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                "bg-light-white"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777d88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /></svg>                  <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
                  新聊天
                </span>
              </li>
            </Link>
            <Link href='/' scroll={false}>
              <li
                className={`flex rounded-md mt-9 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                "bg-light-white"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777d88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-history"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" /></svg>                 <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
                  历史记录
                </span>
              </li>
            </Link>
            <Link href='/' scroll={false}>
              <li
                className={`flex rounded-md mt-2 p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                "bg-light-white"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#777d88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>                  <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
                  设置
                </span>
              </li>
            </Link>
          </ul>
        </div>

      </div>
    </div >
  )
}

export default Sidebar
