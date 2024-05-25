/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        BASE_URL: process.env.BASE_URL,
        EDGEDB_INSTANCE: process.env.EDGEDB_INSTANCE,
        EDGEDB_SECRET_KEY: process.env.EDGEDB_SECRET_KEY,
        MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
        SOCKETIO_URL: process.env.SOCKETIO_URL,
        SOCKETIO_UPDATE_URL: process.env.SOCKETIO_UPDATE_URL,
    },
}

export default nextConfig
