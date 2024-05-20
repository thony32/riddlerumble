/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
    return {
        ...defaultConfig,
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "**",
                },
            ],
        },
        swcMinify: true,
    }
}

export default nextConfig
