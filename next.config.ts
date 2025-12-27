
import type {NextConfig} from 'next';
import withPWA from 'next-pwa';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      base-uri 'self';
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://apis.google.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' https://images.unsplash.com https://picsum.photos https://fastly.picsum.photos https://*.googleusercontent.com data: blob:;
      font-src 'self' data: https://fonts.gstatic.com;
      connect-src 'self' https://*.googleusercontent.com https://*.cloudworkstations.dev http://127.0.0.1:5001 wss://*.cloudworkstations.dev *.firebaseapp.com *.googleapis.com https://firestore.googleapis.com https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://www.google-analytics.com *.google-analytics.com https://*.googletagmanager.com;
      form-action 'self';
      manifest-src 'self';
    `.replace(/\s{2,}/g, ' ').trim()
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
];

const nextConfig: NextConfig = {
  experimental: {
  },
  // Add the development origin to suppress the cross-origin warning
  allowedDevOrigins: ["*.cloudworkstations.dev"],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
       {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5001/studio-953489467-c7e5b/us-central1/api/:path*',
      },
    ];
  },
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);
