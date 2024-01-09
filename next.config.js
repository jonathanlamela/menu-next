/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["uglify-js", "mjml"]
    }
}

module.exports = nextConfig
