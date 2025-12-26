
import type {NextConfig} from 'next';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      base-uri 'self';
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' https://images.unsplash.com https://picsum.photos https://*.googleusercontent.com data:;
      font-src 'self' data: https://fonts.gstatic.com;
      connect-src 'self' https://*.cloudworkstations.dev wss://*.cloudworkstations.dev *.firebaseapp.com *.googleapis.com https://firestore.googleapis.com https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://www.google-analytics.com *.google-analytics.com;
      form-action 'self';
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
};

export default nextConfig;
