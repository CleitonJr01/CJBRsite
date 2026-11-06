import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { useTypeScriptCli: false },
  async headers() {
    return [
      { source: "/downloads/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ];
  },
};

export default nextConfig;
