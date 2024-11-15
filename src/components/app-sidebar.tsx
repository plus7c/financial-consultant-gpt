"use client"

import * as React from "react"
import {
    AudioWaveform,
    Blocks,
    Command,
    Home,
    Inbox,
    MessageCircleQuestion,
    Settings2,
    Sparkles,
    Trash2,
} from "lucide-react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavWorkspaces } from "@/components/nav-workspaces"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { CalendarIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"

// This is sample data.
const data = {
    teams: [
        {
            name: "用户名",
            logo: Command,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "主页",
            url: "/",
            icon: Home,
        },
        {
            title: "新搜索",
            url: "/",
            icon: Sparkles,
        },
        {
            title: "知识库",
            url: "/collection",
            icon: Inbox,
            badge: "10",
        },
    ],
    navSecondary: [
        {
            title: "设置",
            url: "#",
            icon: Settings2,
        },
        {
            title: "帮助",
            url: "#",
            icon: MessageCircleQuestion,
        },
    ],
    favorites: [
        {
            name: "项目管理与任务跟踪",
            url: "#",
            emoji: "📊",
        },
        {
            name: "家庭食谱收集与餐食计划",
            url: "#",
            emoji: "🍳",
        },
        {
            name: "健身追踪与锻炼计划",
            url: "#",
            emoji: "💪",
        },
        {
            name: "书籍笔记与阅读清单",
            url: "#",
            emoji: "📚",
        },
        {
            name: "可持续园艺小贴士与植物养护",
            url: "#",
            emoji: "🌱",
        },
        {
            name: "语言学习进度与资源",
            url: "#",
            emoji: "🗣️",
        },
        {
            name: "家居装修创意与预算跟踪",
            url: "#",
            emoji: "🏠",
        },
        {
            name: "个人理财与投资组合",
            url: "#",
            emoji: "💰",
        },
        {
            name: "电影和电视剧观看清单及评论",
            url: "#",
            emoji: "🎬",
        },
        {
            name: "日常习惯追踪与目标设定",
            url: "#",
            emoji: "✅",
        },
    ],    
    workspaces: [
        {
            name: "Personal Life Management",
            emoji: "🏠",
            pages: [
                {
                    name: "Daily Journal & Reflection",
                    url: "#",
                    emoji: "📔",
                },
                {
                    name: "Health & Wellness Tracker",
                    url: "#",
                    emoji: "🍏",
                },
                {
                    name: "Personal Growth & Learning Goals",
                    url: "#",
                    emoji: "🌟",
                },
            ],
        },
        {
            name: "Professional Development",
            emoji: "💼",
            pages: [
                {
                    name: "Career Objectives & Milestones",
                    url: "#",
                    emoji: "🎯",
                },
                {
                    name: "Skill Acquisition & Training Log",
                    url: "#",
                    emoji: "🧠",
                },
                {
                    name: "Networking Contacts & Events",
                    url: "#",
                    emoji: "🤝",
                },
            ],
        },
        {
            name: "Creative Projects",
            emoji: "🎨",
            pages: [
                {
                    name: "Writing Ideas & Story Outlines",
                    url: "#",
                    emoji: "✍️",
                },
                {
                    name: "Art & Design Portfolio",
                    url: "#",
                    emoji: "🖼️",
                },
                {
                    name: "Music Composition & Practice Log",
                    url: "#",
                    emoji: "🎵",
                },
            ],
        },
        {
            name: "Home Management",
            emoji: "🏡",
            pages: [
                {
                    name: "Household Budget & Expense Tracking",
                    url: "#",
                    emoji: "💰",
                },
                {
                    name: "Home Maintenance Schedule & Tasks",
                    url: "#",
                    emoji: "🔧",
                },
                {
                    name: "Family Calendar & Event Planning",
                    url: "#",
                    emoji: "📅",
                },
            ],
        },
        {
            name: "Travel & Adventure",
            emoji: "🧳",
            pages: [
                {
                    name: "Trip Planning & Itineraries",
                    url: "#",
                    emoji: "🗺️",
                },
                {
                    name: "Travel Bucket List & Inspiration",
                    url: "#",
                    emoji: "🌎",
                },
                {
                    name: "Travel Journal & Photo Gallery",
                    url: "#",
                    emoji: "📸",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
                <NavMain items={data.navMain} />
            </SidebarHeader>
            <SidebarContent>
                <NavFavorites favorites={data.favorites} />
                {/* <NavWorkspaces workspaces={data.workspaces} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
