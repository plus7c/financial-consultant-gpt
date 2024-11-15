import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const data = [
    {
        id: 'c99c2a86-9c0c-ebba-2cf7-e69009ec3adf',
        url: 'http://jiayoudz.com/post/114.html',
        title: '最新港台电影,魅力与影响力全面展现 - 透明LED显示屏 - 佛山市镓...',
        snippet:
            '1、丰富全球电影市场:最新港台电影在全球电影市场上<em>的影响</em>力逐渐增强,丰富了全球电影市场,推动了全球电影产业的繁荣发展。 2、促进文化交流:港台电影在传播过程中,促进...',
        date: '10-01'
    },
    {
        id: '19cc258e-7c94-310a-d32f-39b95f0ccb08',
        url: 'https://www.bilibili.com/read/cv35692889',
        title: '请谈谈台湾新电影运动 | 北电真题解析 | 电影史 - 哔哩哔哩',
        snippet:
            '4<em>影响与</em>贡献 电影艺术的提升:台湾新电影运动提升了台湾电影的艺术水准,使<em>台湾电影在国际影坛</em>上获得了更多的关注和认可。 国际奖项:侯孝贤和杨德昌的多部作品在戛纳、威尼斯、柏林...',
        date: '10-02'
    },
]

export default function Page() {
    return (
        <div className="flex gap-5 w-full mt-10 ">
            {
                data.map((item, index) => (
                    <Card key={index} className="flex flex-col justify-between w-1/5 ">
                        <CardHeader>
                            <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm">
                                {item.snippet}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between text-gray-500">
                            <div>{new URL(item.url).hostname}</div>
                            <div>{item.date}</div>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    )
}
