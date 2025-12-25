
import type {NextConfig} from 'next';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' https://images.unsplash.com https://picsum.photos https://*.googleusercontent.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' wss: *.firebaseapp.com *.googleapis.com https://firestore.googleapis.com https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com *.cloudworkstations.dev;
      frame-src 'self' *.firebaseapp.com https://*.firebaseapp.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig: NextConfig = {
  /* config options here */
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
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: ["*.cloudworkstations.dev"],
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
