'use client'
import React, { FC, useState } from 'react'
import Link from 'next/link'


const Sidebar: FC= () => {
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];
  const [isOpen, setOpen] = useState(true)
  return (
    <div className={` ${isOpen ? "w-72" : "w-20 "
      } bg-dark-purple h-screen p-5  pt-8 relative duration-300 rounded-r-2xl`}>
      <img
        src="/assets/control.png"
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
          border-2 rounded-full  ${!isOpen && "rotate-180"}`}
        onClick={() => setOpen(!isOpen)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src="/assets/logo.png"
          className={`cursor-pointer duration-500 ${isOpen && "rotate-[360deg]"
            }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!isOpen && "scale-0"
            }`}
        >
          <Link href='/' scroll={false}>AI Consultant</Link>
          
        </h1>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
              } `}
          >
            <img src={`/assets/${Menu.src}.png`} />
            <span className={`${!isOpen && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Sidebar
