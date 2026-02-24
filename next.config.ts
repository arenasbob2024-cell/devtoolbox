import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ==========================================
  // 图片优化配置
  // ==========================================
  images: {
    // 禁用 unoptimized 模式，启用 Next.js 图片优化
    unoptimized: false,
    
    // 支持的图片格式（按优先级排序）
    // avif: 最优压缩率，但编码较慢
    // webp: 广泛支持，良好压缩率
    formats: ['image/avif', 'image/webp'],
    
    // 设备响应式图片尺寸
    // 覆盖常见的设备视口宽度
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // 图片组件尺寸
    // 用于 layout="fixed" 或 layout="intrinsic" 的图片
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // 图片缓存时间（秒）
    // 30天 = 2592000秒
    minimumCacheTTL: 2592000,
    
    // 允许的图片域名（如需从外部加载图片）
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //   },
    // ],
    
    // 禁用静态导入图片的优化（如果需要）
    // disableStaticImages: false,
  },

  // ==========================================
  // URL 和路由配置
  // ==========================================
  // 启用尾部斜杠，统一 URL 格式
  trailingSlash: true,
  
  // ==========================================
  // 安全和 HTTP 头配置
  // ==========================================
  // 禁用 X-Powered-By 头（安全最佳实践）
  poweredByHeader: false,
  
  // ==========================================
  // 压缩配置
  // ==========================================
  // 启用 gzip 压缩
  compress: true,
  
  // ==========================================
  // 实验性功能（可选）
  // ==========================================
  // 启用部分预渲染（Next.js 14+）
  // experimental: {
  //   ppr: true,
  // },
  
  // ==========================================
  // 重定向配置（可选）
  // ==========================================
  // async redirects() {
  //   return [
  //     {
  //       source: '/old-path',
  //       destination: '/new-path',
  //       permanent: true,
  //     },
  //   ];
  // },
  
  // ==========================================
  // HTTP 头配置（安全 + 缓存）
  // ==========================================
  async headers() {
    return [
      {
        // 为所有路由应用安全头
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // 静态资源长期缓存
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 图片资源缓存
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // 公共资源缓存
        source: '/:path*(svg|png|jpg|jpeg|gif|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
