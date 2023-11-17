/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["uglify-js"]
    }
}

module.exports = nextConfig
