'use client'

import { Annoyed } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

import { Answer } from '@/app/components/answer'
import { Relates } from '@/app/components/relates'
import { Sources } from '@/app/components/sources'
import { Relate } from '@/app/interfaces/relate'
import { Source } from '@/app/interfaces/source'
import { parseStreaming } from '@/app/utils/parse-streaming'

export const Result: FC<{ query: string; rid?: string }> = ({ query, rid }) => {
  const [sources, setSources] = useState<Source[]>([])
  const [markdown, setMarkdown] = useState<string>('')
  const [relates, setRelates] = useState<Relate[] | null>(null)
  const [error, setError] = useState<number | null>(null)
  const [outputs, setOutputs] = useState<string[]>([]);
  useEffect(() => {
    const eventSource = new EventSource(`http://172.22.121.63:32323/api/v1/base/arerank?keyword=${query}`);

    // 监听消息事件
    eventSource.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.event) {
          case 'search::search_result':
            setOutputs((preOutputs) => [...preOutputs, message.data]);
            break;
          case 'search::search_done':
            eventSource.close();
            break;
          default:
            console.log('Unknown event type:', message.event);
        }
      } catch (error) {
        console.error('Error parsing message data:', error);
      }
    };

    // 在组件卸载时关闭连接
    return () => {
      eventSource.close();
    };
    // const controller = new AbortController()
    // void parseStreaming(
    //   controller,
    //   query,
    //   rid,
    //   setSources,
    //   setMarkdown,
    //   setRelates,
    //   setError,
    // )
    // return () => {
    //   controller && controller.abort()
    // }
  }, [query])
  return (
    <div>
      <div>
        {outputs.map((output, index) => (
          <span className='break-all' key={index}>{output.keyword}</span>
        ))}
      </div>
      
    </div>
    // <div className="flex flex-col gap-8">
    //   <Answer markdown={markdown} sources={sources}></Answer>
    //   <Sources sources={sources}></Sources>
    //   <div className="border-b   border-[#E4E4E3]"></div>
    //   <Relates relates={relates}></Relates>
    //   {error && (
    //     <div className="absolute inset-4 flex items-center justify-center bg-white/40 backdrop-blur-sm">
    //       <div className="flex gap-4 rounded bg-white p-4 font-medium text-blue-500 shadow-2xl">
    //         <Annoyed></Annoyed>
    //         {error === 429
    //           ? 'Sorry, you have made too many requests recently, try again later.'
    //           : 'Sorry, we might be overloaded, try again later.'}
    //       </div>
    //     </div>
    //   )}
    // </div>
  )
}
