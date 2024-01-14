/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, //Must be deactivated for bottomSheet to work in dev mode
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fodjjlnxgytdgszbhqkw.supabase.co',
                port: '',
                pathname: '/storage/**',
            },
        ],
    },
}

module.exports = nextConfig
