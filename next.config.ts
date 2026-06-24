/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tus configuraciones existentes aquí...
  experimental: {
    // cualquier configuración experimental que tengas
  },
  
  // Agregar esta sección de images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend-imagen-br.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',  
        hostname: 'img.youtube.com',
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
  
  // Cualquier otra configuración que tengas...
};

module.exports = nextConfig;