import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 从 URL 参数获取信息
    const title = searchParams.get('title') || 'AICalculator.pro';
    const subtitle = searchParams.get('subtitle') || 'Free Online Calculator';
    const icon = searchParams.get('icon') || '🧮';
    const category = searchParams.get('category') || 'Calculator';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'linear-gradient(to bottom right, #EFF6FF, #DBEAFE, #BFDBFE)',
            position: 'relative',
          }}
        >
          {/* 装饰性背景元素 */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
              opacity: 0.1,
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-50px',
              left: '-50px',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
              opacity: 0.1,
              display: 'flex',
            }}
          />

          {/* 主内容区域 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px 60px',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            {/* 图标 */}
            <div
              style={{
                fontSize: '120px',
                marginBottom: '30px',
                display: 'flex',
              }}
            >
              {icon}
            </div>

            {/* 标题 */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: '#1E3A8A',
                margin: '0 0 20px 0',
                lineHeight: 1.2,
                maxWidth: '1000px',
                display: 'flex',
              }}
            >
              {title}
            </h1>

            {/* 副标题 */}
            <p
              style={{
                fontSize: '32px',
                color: '#4B5563',
                margin: '0 0 30px 0',
                maxWidth: '900px',
                display: 'flex',
              }}
            >
              {subtitle}
            </p>

            {/* 标签 */}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '40px',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  color: '#2563EB',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontWeight: '600',
                  display: 'flex',
                }}
              >
                ✓ Free
              </span>
              <span
                style={{
                  fontSize: '24px',
                  color: '#2563EB',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontWeight: '600',
                  display: 'flex',
                }}
              >
                ✓ No Signup
              </span>
              <span
                style={{
                  fontSize: '24px',
                  color: '#2563EB',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontWeight: '600',
                  display: 'flex',
                }}
              >
                ✓ AI-Powered
              </span>
            </div>

            {/* 网站名称 */}
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ display: 'flex' }}>🧮</span>
              <span style={{ display: 'flex' }}>AICalculator.pro</span>
            </div>

            {/* 分类标签（右下角） */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '60px',
                fontSize: '20px',
                color: '#6B7280',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '8px 20px',
                borderRadius: '8px',
                display: 'flex',
              }}
            >
              {category}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}

