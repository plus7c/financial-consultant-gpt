// app/api/proxy/route.js
import fetch from 'node-fetch';

export async function GET(request) {
    const urlParams = new URL(request.url).searchParams;
    const query = urlParams.get('query');  // 获取请求中的 query 参数

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;  // 获取环境变量
    const targetUrl = `${apiUrl}/workflow/query?keyword=${query}`;

    try {
        // 发起请求到后端 API
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // 判断响应是否是流式响应
        if (response.ok) {
            // 设置响应头为 text/event-stream
            const stream = response.body;
            return new Response(stream, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Failed to fetch data' }), { status: 500 });
        }
    } catch (error) {
        console.error('Error during request forwarding:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
