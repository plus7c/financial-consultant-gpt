import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import './globals.css'

import { ReactNode } from 'react'

// import Sidebar from './components/sidebar'

import { AppSidebar } from "@/components/app-sidebar"
import { NavActions } from "@/components/nav-actions"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '智能调研助手',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        {/* <div className="flex min-h-screen">
          <Sidebar />
          <div className="mx-24 flex min-h-full flex-1 flex-col justify-end">
            {children}
          </div>
        </div> */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <span>
                知识库
                </span>
              </div>
              <div className="ml-auto px-3">
                <NavActions />
              </div>
            </header>
            <div className="mx-24 flex flex-1 flex-col  min-h-full">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
