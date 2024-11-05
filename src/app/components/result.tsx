import { CircleEllipsis, Quote } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { motion, useAnimate } from 'framer-motion'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'

import { referencesType, summaryType } from '@/app/interfaces/result'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { markdownContent as md, data as mock } from '@/data'

import { Skeleton } from './skeleton'

export const Result: FC<{
  query: string
  onIsCommitedChange: any
  onTextSelect: (selectedText: string) => void
}> = ({ query, onIsCommitedChange, onTextSelect }) => {
  /* 本地mock测试 */
  // const [isLoading, setIsLoading] = useState(false);
  // const [references, setReferences] = useState<referencesType[]>(mock);
  // const [reasons, setReasons] = useState<string[]>(md);
  const [isLoading, setIsLoading] = useState(true)
  const [references, setReferences] = useState<referencesType[]>([])
  const [reasons, setReasons] = useState<string[]>([])
  const [advices, setAdvices] = useState<string[]>([])
  const [selectedText, setSelectedText] = useState<string | null>(null)
  const [buttonPosition, setButtonPosition] = useState<{
    top: number
    left: number
  } | null>(null)
  const [selectedArea, setSelectedArea] = useState(null)
  const [summary, setSummary] = useState<summaryType>({
    origin: null,
    analyse: [],
    propose: [],
  })

  const frameRef = useRef<HTMLDivElement | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const [scope, animate] = useAnimate()

  /* loading 动画效果 */
  useEffect(() => {
    if (!scope.current || !frameRef.current) return // 确保引用已经存在
    const containerWidth = frameRef.current?.offsetWidth
    const animateLoader = async () => {
      await animate(
        [
          [scope.current, { x: 0, width: '100%' }],
          [scope.current, { x: containerWidth, width: '0%' }, { delay: 0.6 }],
        ],
        {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.8,
        },
      )
    }
    animateLoader()
  }, [])

  /* 处理文本引用的逻辑 */
  const handleTextSelect = () => {
    const selection = window.getSelection()
    const selectedText = selection?.toString()
    if (selectedText) {
      const range = selection?.getRangeAt(0).getBoundingClientRect()
      if (range) {
        setSelectedText(selectedText)
        setButtonPosition({
          top: range.top + window.scrollY - 40, // 按钮显示在选中文本上方
          left: range.left + window.scrollX,
        })
      }
    }
  }

  const handleAddText = () => {
    if (selectedText) {
      onTextSelect(selectedText) // 将选中的文本传递给父组件
      setSelectedText(null)
      setButtonPosition(null)
    }
  }

  const handleClickOutside = (event: any) => {
    if (!selectedText) {
      setButtonPosition(null)
    }
  }

  useEffect(() => {
    /* 监听鼠标点击和释放 */
    document.addEventListener('mouseup', handleTextSelect)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleTextSelect)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  /* 获取数据后，自动滚动页面 */
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [reasons, advices, references, summary])

  /* 请求数据 */
  useEffect(() => {
    /* 服务器 */
    console.log('API URL:', process.env.API_URL)
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/workflow/query?keyword=${query}`,
    )
    /* 本地 */
    // const eventSource = new EventSource(`http://192.168.229.24:8080/api/v1/workflow/query?keyword=${query}`);
    eventSource.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        if (message.status === 'finish') {
          onIsCommitedChange(true)
          console.log('断开链接')
          eventSource.close()
        }
        switch (message.type) {
          case '0000': // 后端不走搜索的情况，没有block模板
            setIsLoading(false)
            setReasons((preReasons) => [...preReasons, message.data])
            break
          case '0001': // 来源引用
            setIsLoading(false)
            setReferences((preReferences) => [
              ...preReferences,
              ...message.data.reference_data,
            ])
            break
          case '0010': // 分析推理
            setIsLoading(false)
            setReasons((preReasons) => [...preReasons, message.data])
            break
          case '0011': // 总结意见
            setIsLoading(false)
            setAdvices((preAdvices) => [...preAdvices, message.data])
            break
          case '0100':
            const d = message.data
            // parse解析嵌套对象
            const s = {
              origin: null,
              analyse: JSON.parse(d.analyse),
              propose: JSON.parse(d.propose),
            }
            setSummary(s) // 直接设置数据
            break
          default:
            console.log('Unknown event type:', message.event)
        }
      } catch (error) {
        console.error('Error parsing message data:', error)
      }
    }

    return () => {
      eventSource.close()
    }
  }, [query])

  return (
    <>
      {isLoading /* 骨架屏 */ ? (
        <div>
          <div className="relative" ref={frameRef}>
            <motion.div ref={scope} className="absolute h-full bg-gray-200" />
            <h1 className="m-5 whitespace-nowrap text-xl text-black mix-blend-multiply">
              <i>正在为您搜寻...</i>
            </h1>
          </div>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="mb-1 h-5 w-full bg-zinc-300/80" />
          ))}
          <Skeleton className="mb-10 h-5 w-full bg-zinc-300/80"></Skeleton>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="mb-1 h-5 w-full bg-zinc-300/80" />
          ))}
          <Skeleton className="mb-10 h-5 w-full bg-zinc-300/80"></Skeleton>
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="mb-1 h-5 w-full bg-zinc-300/80" />
          ))}
          <Skeleton className="mb-5 h-5 w-full bg-zinc-300/80"></Skeleton>
        </div>
      ) : (
        <div className="flex flex-row justify-stretch space-x-10">
          <div className="flex w-full flex-col gap-4">
            {references.length > 0 && (
              <>
                <div className="flex gap-2 py-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2354a4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-layers"
                  >
                    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
                    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
                  </svg>
                  <span>以下是为您收集到的相关内容：</span>
                </div>

                <div className="flex w-[40vw] gap-4">
                  {references.slice(0, 3).map((reference, index) => (
                    <div
                      key={reference.id}
                      className="group relative flex w-44 gap-2 rounded-lg bg-gray-100 p-4 shadow-md transition-all duration-300 ease-in-out hover:bg-gray-300"
                    >
                      {/* <img src={reference.siteIcon} alt="site icon" className="w-8 h-8 rounded-full" /> */}
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col justify-between"
                      >
                        <div className="mb-1 overflow-hidden text-ellipsis break-words text-xs font-semibold">
                          {reference.title}
                        </div>
                        <div className="block w-full max-w-36 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-600 hover:text-blue-500">
                          {reference.url}
                        </div>
                      </a>
                      <div className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-96 scale-95 transform overflow-visible rounded-lg border bg-white p-4 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
                        <div className="text-sm font-semibold">
                          {reference.title}
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          {reference.snippet}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Sheet>
                    <SheetTrigger className="group relative flex flex-col rounded-lg bg-gray-100 py-2 text-xs shadow-md transition-all duration-300 ease-in-out hover:bg-gray-300">
                      {references.slice(3, 5).map((reference, index) => (
                        <div
                          key={reference.id}
                          className="group relative flex w-44 px-3 pt-1 transition-all duration-300 ease-in-out"
                        >
                          <div>
                            <div className="mb-1 block max-w-36 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold">
                              {reference.title}
                            </div>
                            <div className="block w-full max-w-36 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-600">
                              {reference.url}
                            </div>
                            <Separator></Separator>
                          </div>
                        </div>
                      ))}
                      <div className="ml-3 mt-5 flex flex-row items-center gap-2 text-sm text-blue-theme">
                        <CircleEllipsis size={16}></CircleEllipsis>
                        <div>查看更多</div>
                      </div>
                    </SheetTrigger>
                    <SheetContent className="overflow-auto">
                      <SheetHeader>
                        <SheetTitle>{references.length}个相关资源</SheetTitle>
                        <SheetDescription>{query}</SheetDescription>
                      </SheetHeader>
                      <div className="mt-5 flex flex-col gap-4">
                        {references.map(
                          ({ id, title, url, snippet }, index) => (
                            <div
                              key={id}
                              className="flex flex-col rounded-lg border bg-slate-300 p-4 transition-all duration-200 hover:bg-slate-400 hover:shadow-lg"
                            >
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col gap-2"
                              >
                                <div>
                                  {index + 1}、{title}
                                </div>
                                <div className="text-sm">
                                  <b>简介</b>：{snippet}
                                </div>
                                <div className="block overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-600 hover:text-blue-200">
                                  {url}
                                </div>
                              </a>
                            </div>
                          ),
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </>
            )}
            <div>
              {/* 分析 */}
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className="animation-delay-0 flex-1 animate-fadeInUp"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks, remarkParse]}
                    components={{
                      p: ({ node, ...props }) => (
                        <span className="ml-5" {...props} />
                      ),
                      h1: ({ node, ...props }) => (
                        <h3 className="my-3" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h3 className="my-3" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="my-3 text-2xl font-bold" {...props}>
                          <div className="flex items-center gap-2 py-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#2354a4"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chart-no-axes-combined"
                            >
                              <path d="M12 16v5" />
                              <path d="M16 14v7" />
                              <path d="M20 10v11" />
                              <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
                              <path d="M4 18v3" />
                              <path d="M8 14v7" />
                            </svg>
                            <span>{props.children}</span>
                          </div>
                        </h3>
                      ),
                      h4: ({ node, ...props }) => (
                        <h4 className="my-3 text-lg font-bold" {...props} />
                      ),
                      h5: ({ node, ...props }) => (
                        <h3 className="my-3" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol style={{ marginLeft: '20px' }} {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="my-2 ml-6 leading-relaxed" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="my-1" {...props} />
                      ),
                      b: ({ node, ...props }) => (
                        <b className="my-4 ml-6 leading-relaxed" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <span className="group relative transition-all duration-300 ease-in-out">
                          <button
                            onClick={() =>
                              window.open(
                                props.href,
                                '_blank',
                                'noopener,noreferrer',
                              )
                            }
                            className="ml-1 h-5 w-5 rounded-full bg-blue-theme font-sans text-xs leading-5 text-white hover:bg-zinc-600"
                          >
                            {props.children}
                          </button>
                          <div className="pointer-events-none absolute bottom-full left-0 z-10 mt-2 w-96 scale-95 transform overflow-visible rounded-lg border bg-white p-4 opacity-0 shadow-lg transition-all duration-300 ease-in-out group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
                            <div className="text-sm font-semibold">
                              {references[Number(props.children)]?.title}
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                              {references[Number(props.children)]?.snippet}
                            </div>
                          </div>
                        </span>
                      ),
                    }}
                  >
                    {reason}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
            <div>
              {/* 建议 */}
              {advices.map((advice, index) => (
                <div
                  key={index}
                  className="animation-delay-0 flex-1 animate-fadeInUp"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks, remarkParse]}
                    components={{
                      p: ({ node, ...props }) => (
                        <span className="ml-5" {...props} />
                      ),
                      h1: ({ node, ...props }) => (
                        <h3 className="my-3" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h3 className="my-3" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="my-3 text-2xl font-bold" {...props}>
                          <div className="flex items-center gap-2 py-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#2354a4"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-bot"
                            >
                              <path d="M12 8V4H8" />
                              <rect width="16" height="12" x="4" y="8" rx="2" />
                              <path d="M2 14h2" />
                              <path d="M20 14h2" />
                              <path d="M15 13v2" />
                              <path d="M9 13v2" />
                            </svg>
                            <span>{props.children}</span>
                          </div>
                        </h3>
                      ),
                      h4: ({ node, ...props }) => (
                        <h4 className="my-3 text-lg font-bold" {...props} />
                      ),
                      h5: ({ node, ...props }) => (
                        <h3 className="my-3" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol style={{ marginLeft: '20px' }} {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="my-2 ml-6 leading-relaxed" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="my-1" {...props} />
                      ),
                      b: ({ node, ...props }) => (
                        <b className="my-4 ml-6 leading-relaxed" {...props} />
                      ),
                    }}
                  >
                    {advice}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
          {/* 大纲 */}
          <div className="relative min-w-44">
            <div className="sticky top-4 z-10">
              <Accordion type="multiple" defaultValue={['analyse', 'propose']}>
                {summary.analyse.length > 0 && (
                  <AccordionItem value="analyse">
                    <AccordionTrigger>{summary.analyse[0]}</AccordionTrigger>
                    <AccordionContent>
                      {summary.analyse[1]?.map((analysis, index) => (
                        <div key={index} className="mb-2">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                          >
                            {analysis}
                          </ReactMarkdown>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                )}
                {summary.propose.length > 0 && (
                  <AccordionItem value="propose">
                    <AccordionTrigger>{summary.propose[0]}</AccordionTrigger>
                    <AccordionContent>
                      {summary.propose[1]?.map((proposal, index) => (
                        <div key={index} className="mb-2">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                          >
                            {proposal}
                          </ReactMarkdown>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
            <div />
            {buttonPosition && selectedText && (
              <button
                style={{
                  position: 'absolute',
                  top: buttonPosition.top,
                  left: buttonPosition.left,
                }}
                className="rounded-2xl border-2 border-stone-600 bg-gray-100 p-2 text-white"
                onClick={handleAddText}
              >
                <Quote size={16} color="#000000" />
              </button>
            )}
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </>
  )
}
